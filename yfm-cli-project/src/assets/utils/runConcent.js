/*
  * author: yfm
  * date: 2020-02-01
  * 全局数据/hooks/concent
  *
*/ 
import { run } from 'concent';
import { price, $$global } from '@/model';
import { concentWebDevToolMiddleware } from 'concent-middleware-web-devtool';

console.log('****** runConcent ******');

run({
  $$global,
  price
},{
  middlewares:[
    concentWebDevToolMiddleware,
    (ctx, next)=>{
      next();
    }
  ]
});