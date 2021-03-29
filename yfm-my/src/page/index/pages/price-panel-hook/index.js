import React, { Component, Fragment } from "react";
import { List, Card, Button, Alert, Tag } from 'antd';
import { useConcent } from 'concent';

/** 定义setup，在组件初次渲染前被调用一次，结果返回到settings里 */
const setup = ctx => {

  /** 定义副作用，指定第二个参数为空数组，表示只在组件初次挂载完毕时执行一次 */
  ctx.effect(ctx => {
    ctx.settings.init();
  }, []);

  /** 对key '_exitPrice', '_tradePrice'，定义副作用函数，
   * 它们之一任何一个发生变化时，都将触发此副作用函数
   * 执行时机是在组件渲染完毕之后
   *  参数3 表示时候在组件初次挂载完毕是就立即执行，默认是true
   */
  ctx.effect(ctx=>{
    console.log('_exitPrice or _tradePrice value changed')
  }, ['_exitPrice', '_tradePrice'], false);

  /** 
   * 可以参考vue-watch使用
   * 对key定义watch函数，当key的值发生变化，触发此函数，执行时机是在组件渲染之前 */
  ctx.watch({
    '_exitPrice'(newVal, oldVal){
      if(newVal==='888'){
        console.log('user input 888')
        /** 清除掉id为effect_1的副作用函数定义 */
        ctx.removeEffect('effect_1');
      }
    },
    '_tradePrice'(newVal, oldVal){
      if(newVal==='666')alert('user input 666');
    }
  });
  
  ctx.aux('onUrlChanged', ()=>{
    ctx.settings.init();
  });

  const init = () => ctx.dispatch('init')

  /** 处理出厂价变化 */
  const handleInputExitPriceChange = e => {
    ctx.dispatch('handleInputExitPriceChange', e.currentTarget.value);
  };

  /** 处理批发价变化 */
  const handleInputTradePriceChange = e => {
    ctx.dispatch('handleInputTradePriceChange', e.currentTarget.value);
  };

  const modifyExitPrice = () => {
    console.log('%c@@@ modifyExitPrice', 'color:red;border:1px solid blue', )
    ctx.dispatch('modifyExitPrice', ctx.state._exitPrice);
  };

  const modifyTradePrice = () => {
    ctx.dispatch('modifyTradePrice', ctx.state._tradePrice);
  };

  return { init, handleInputExitPriceChange, handleInputTradePriceChange, modifyExitPrice, modifyTradePrice };
}

const locaState = { _exitPrice: 0, _tradePrice: 0, loading: false };

const mapProps = ctx => {
  const settings = ctx.settings; // 由setup返回
  const { _exitPrice, _tradePrice, loading } = ctx.state;//mergedState from local and price module
  const {
    exitPrice, tradePrice, retailPrice, activityPrice,
    exitPriceMsg, tradePriceMsg
  } = ctx.moduleState;
  return {
    ...settings, _exitPrice, _tradePrice, loading,
    exitPrice, tradePrice, retailPrice, activityPrice, exitPriceMsg, tradePriceMsg
  }
}

const UI = (props) => {
  const {
    _exitPrice, _tradePrice, loading, exitPrice, tradePrice, retailPrice, 
    activityPrice, exitPriceMsg, tradePriceMsg, handleInputExitPriceChange, 
    handleInputTradePriceChange, modifyExitPrice, modifyTradePrice
  } = props;

  console.log('%c@@@ PricePanelDumb', 'color:blue;border:1px solid blue', loading);
  return (
    <Card loading={loading} title={<span><Tag color="cyan">hook函数组件</Tag>,
    -- 使用useConcent构建</span>}>
      <Alert message={exitPriceMsg} type="error" />
      <div>exitPrice: {exitPrice}
        <br />
        <Button onClick={modifyExitPrice}>修改</Button>
        <input value={_exitPrice} onChange={e=>handleInputExitPriceChange(e)} />
      </div>
      <div>
        <Alert message={tradePriceMsg} type="error" />
        tradePrice: {tradePrice}
        <br />
        <Button onClick={modifyTradePrice}>修改</Button>

        <input value={_tradePrice} onChange={handleInputTradePriceChange} />
      </div>
      <div>retailPrice: {retailPrice}</div>
      <div>activityPrice: {activityPrice}</div>
    </Card>
  );
}

/**
export default registerDumb({ ccKey:'ooxx', setup, mapProps, module: 'price', state: localState })(UI);
 */
const localState = {_tradePrice:0, _exitPrice:0};
export default function PricePanelHook(){
  const { mapped } = useConcent({ 
      ccKey:'ooxx', 
      setup, 
      mapProps, 
      module: 'price', 
      state: localState 
    });
  return <UI {...mapped}/>
}




