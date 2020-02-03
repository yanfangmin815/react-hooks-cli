const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
const ranNum = () => parseInt(Math.random() * 19);
//支持写完async 或者 generator函数

export default {
  getLastestPrice: async () => {
    await delay();
    return {
      exitPrice: 20 + ranNum(),
      tradePrice: 50 + ranNum(),
      retailPrice: 100 + ranNum(),
      activityPrice: 80 + ranNum(),
    }
  },
  //上报修改行为
  uploadModEvent: async (modTarget) => {
    await delay();
    console.log('mod ' + modTarget);
    return
  }
}