import React from 'react';
import ReactDOM from 'react-dom';

//全局下挂载一个容器来实现信息共享和通信
(function anonymous(){
    let stateObj = {},          //状态存储
        listenArray = [];       //状态改变所需的方法

    function updateState(callback){  //callback ： 修改状态的操作
        let newObj = callback(stateObj);
        stateObj = {...stateObj,...newObj};  //返回的状态信息替换原有的

        //当状态更改，通知listenArray中的方法执行
        listenArray.forEach(item => {
            if( typeof item === 'function'){
                item();
            }
        });

    }

    function getState(){ //获取最新属性
        return stateObj;
    }

    function subscribe(fn){ //添加方法
        listenArray.forEach(item => {
            if( item === fn){
                return;
            }
        });
        listenArray.push(fn);

        
    }

    window.myRedux = {  //把方法暴露出去 外面通过 myRedux.updateState即可使用
        updateState,getState,subscribe
    }

})();



/******************************************************************************************/


//外部使用的方法
myRedux.updateState( state => {  //某一个页面：获取原有值(如果没有默认是0)，返回新值
    let {n = 0} = state;
    return {
        n:n+1
    }
})

let state = myRedux.getState()  //其他页面：获取新值

/*************************自己写的问题*********************************************************/
//1. 谁都可以任意修改信息
//2. 没有留下痕迹
 
