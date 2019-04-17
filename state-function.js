import React from 'react';
import ReactDOM from 'react-dom';

/***
 * 函数式组件是静态组件：与执行普通方法一样，调取一次组件，就把组件中的内容获取到，插入到页面当中
 * 如果不重新调取组件，显示的内容不会发生任何改变
 * 
 * 真实项目中，组件中内容不改变的情况下才可能使用函数式组件
 */
function Clock(){
    return <div>
        <h3>当前北京时间为:</h3>
        <div style={{color:'grey', fontWeight:'bold'}}>{new Date().toLocaleString()}</div>
    </div>
}

setInterval(()=>{ //定时器，每一秒都重新渲染
    ReactDOM.render(<Clock/>, document.getElementById('root'));
},1000)
