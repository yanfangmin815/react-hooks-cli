

export function getInitialState() {
    return {
      exitPrice: 220, //出厂价格
      tradePrice: 50, //批发价格
      retailPrice: 100, //零售价格
      activityPrice: 80, //活动价格
  
      exitPriceMsg: '',
      tradePriceMsg: '',
  
      updateLogs: [],
    }
  }
  
  export default getInitialState();