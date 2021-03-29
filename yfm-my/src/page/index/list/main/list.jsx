import React, {Component, PropTypes} from 'react';
import {hot} from 'react-hot-loader'
import { register } from 'concent';
import './list.css'

import { Loading, Content } from '@/component/index'


class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            lang: localStorage.getItem('lang_type') || 'en-US',
            SUPPOER_LOCALES: [
                {
                  name: 'English',
                  value: 'en-US'
                },
                {
                  name: '简体中文',
                  value: 'zh-CN'
                },
                {
                  name: '文言文',
                  value: 'cl-CN'
                }
              ] 
        }
    }

    // componentDidMount() {
    //     this.init();
    // }

    init = ()=>{
        return this.ctx.dispatch('init');
    }

    $$setup(ctx) {
        console.log(ctx, 'CTX')
        this.init();
      }

    componentDidUpdate() {
        // console.log('list updated.....')
    }

    pushGoods = () => {}

    changeLoadings = () => {}

    onSelectLocale = ev => {
        localStorage.setItem('lang_type', ev.target.value);
        window.location.reload();
    };

    render() {
        /** 
         * state由模块的state和用户自己扩展的私有state合并而来 
         * */
        const {
            // price模块 
            exitPriceMsg, tradePriceMsg, exitPrice, tradePrice, 
            retailPrice, activityPrice,
            // 自定义属性
            lang, SUPPOER_LOCALES
        } = this.state
  
        console.log('%c@@@ List-render', 'color:blue;border:1px solid blue');
        return(
            <div className='app-container'>
                <Content 
                    lang = {lang}
                    SUPPOER_LOCALES = {SUPPOER_LOCALES}
                    onSelectLocale = {this.onSelectLocale}/>
                {/* <div onClick={this.pushGoods}>改变goods</div>
                <div onClicks={this.changeLoadings}>改变loading</div> */}
                {/* <Loading show={loading}/> */}
                {/* {goods && goods.length && goods.map((good,index) => {
                    return (
                        <span key={index}>{good}</span>
                    )
                })} */}
            </div>
        )
    }
}


// const Lists = hot(module)(List);
// export default hot(module)(List);
export default register('price')(List);
