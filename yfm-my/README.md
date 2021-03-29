# 目录结构
## 一、build
> webpack构建文件夹，一般情况不用修改
---
## 二、config
> 服务器配置文件
```js
// 修改此属性，可以配置不同的代理
proxy: {
  '/v/**': {
    target: 'http://www.cnblogs.com/',  # `必须可用的URL 相应的baseURL也要为`
    secure: false,
    changeOrigin: true
  }
}
```
---
## 三、src
### api
> 接口存放文件夹，所有的接口都存放在这里，里面分入口进行存放

1. file.js是配置文件，之后可以做优化；
2. 接口分模块管理

### assets
> 图片资源存放文件夹，凡是打包进代码的图片资源都放在这里，需要外链的图片路径放到static文件夹里面

### channels
> 频道分组。根据项目模块拆分成了不同频道
1. interceptor：全局请求拦截文件
2. invoker：初始化域名为axios对象
3. utils：工具文件
```js
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
```

### components
> 所有模块都可能需要的组件放在这里
1. router-guard：全局路由守卫 根据UI变化改变title
2. with-router：withRouter功能组件

### html
> 多入口文件

### locales
> 国际化语言文件
  1. xxx.jsx
  2. xxx.js

### model
> 全局系统状态数据
  1. computed.js
  2. index.js
  3. reducer.js
  4. state.js

### page
> 页面文件

### router
> 路由文件

### style 
> 全局样式文件

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

