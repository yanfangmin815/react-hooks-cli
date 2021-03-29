import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import {Provider} from 'react-redux'
// import registerServiceWorker from './registerServiceWorker';

// 初始化域名为axios对象
import '@/assets/invoker/invoker'
import '@/style/public.css'
// 全局数据引入
import '@/assets/utils/runConcent';

ReactDOM.render(
    (
        <App/>
    ),
    document.getElementById('root')
);
// registerServiceWorker();

