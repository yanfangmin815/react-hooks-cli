
import api from '@/service/api';
import {
  reqMovies,
  reqSearchMovie,
  reqMockDataGood
} from '@/api/index/list'

const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// <<<--- pure reducer fns
export async function _recordLog({ modKey, oldVal, newVal }, moduleState) {
  await api.uploadModEvent(modKey);
  const updateLogs = moduleState.updateLogs;
  updateLogs.unshift(`${modKey} 被用户修改从[${oldVal}]修改为[${newVal}]`);
  return { updateLogs };
}

export function _modifyExitPrice(exitPrice){
  let exitPriceMsg = '';
  if (exitPrice > 100) {
    if (exitPrice < 200) exitPriceMsg = '注意，出厂价太高了';
    else exitPriceMsg = '注意，出厂价高得离谱';
  }
  return { exitPriceMsg, exitPrice }
}

export function _setLoading(loading){
  return {loading}
}
//--->>> end

export async function init(payload, moduleState, ctx){
  await ctx.dispatch(_setLoading, true);
  // await ctx.dispatch(refreshPrice);
  await ctx.dispatch(reqMockDataGood);
  await ctx.dispatch(_setLoading, false);
}

export async function refreshPrice() {
  const ret = await api.getLastestPrice();
  return ret;
}

export async function handleInputExitPriceChange(_exitPrice) {
  let exitPriceMsg = ''
  if (_exitPrice > 100) {
    if (_exitPrice < 200) exitPriceMsg = '注意，出厂价太高了'
    else exitPriceMsg = '注意，出厂价高得离谱'
  }
  return { exitPriceMsg, _exitPrice }
}

export async function handleInputTradePriceChange(_tradePrice) {
  let tradePriceMsg = ''
  if (_tradePrice > 600) {
    if (_tradePrice < 1000) tradePriceMsg = '注意，批发价太高了';
    else tradePriceMsg = '注意，批发价已经搞过市面所有对手！！！';
  }
  return { tradePriceMsg, _tradePrice }
}


export async function modifyExitPrice(exitPrice, moduleState, ctx){
  const payload = { 
    modKey:'exitPrice', 
    oldVal:moduleState.exitPrice, 
    newVal:exitPrice };
  await ctx.dispatch(_setLoading, true);
  await delay();
  ctx.dispatch(_recordLog, payload);
  return { exitPrice, loading:false };
}


export async function modifyTradePrice(tradePrice, moduleState, ctx){
  const payload = { modKey:'tradePrice', oldVal:moduleState.tradePrice, newVal:tradePrice };
  await ctx.dispatch(_setLoading, true);
  await delay();
  ctx.dispatch(_recordLog, payload);
  return { tradePrice, loading:false };
}

