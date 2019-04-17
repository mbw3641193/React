import React from 'react';
import ReactDOM from 'react-dom';

/***
 * 组建状态类似于vue中的数据驱动 data(){}
 * 数据绑定的时候是基于状态值绑定。当修改组件内部状态后，对应的JSX元素也会跟着重新渲染(差异渲染)，基于dom-diff算法完成
 * 
 * 目前前端框架最核心的思想就是数据操控视图(视图影响数据)，从而减少直接操作dom
 * 
 */
class Clock extends React.Component {
    constructor() {
        super();
        this.state = {   //初始化组件状态(都是对象类型的):在constructor中需要把后期使用的状态信息全部初始化一下
            time: new Date().toLocaleString(),
        }
    }

    componentDidMount(){ //生命周期函数之一:第一次组件渲染完成 
        //在这里每1000ms把state中的time数据改变，react会自动帮我们把组件中的部分内容进行重新的渲染
        setInterval(()=>{
            // this.state.time = new Date().toLocaleString(); //这个方式虽然可以修改状态，但是并不会通知react重新渲染页面，所以不要这样操作
            this.setState({ //父类的方法,修改组件状态
                //1.修改部分状态：会用我们传递的对象跟初始化的state进行匹配。只把传递的属性进行修改
                //2.当状态修改完成，会通知react把组件JSX中的部分元素重新进行渲染
                time: new Date().toLocaleString(),
            },()=>{
                //JSX元素渲染完成后，执行的回调操作(类似于生命周期函数中的 componentDidUpdate),基本不用，而是直接使用生命周期函数
                //设置回调的原因：setState是异步操作
            }); 
        },1000)

    }

    render() {
        return <div>
            <h3>当前北京时间为:</h3>
            <div style={{ color: 'grey', fontWeight: 'bold' }}>{this.state.time}</div>
        </div>
    }
}


ReactDOM.render(<Clock />, document.getElementById('root'));




