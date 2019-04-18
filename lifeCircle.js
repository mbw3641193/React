import React from 'react';
import ReactDOM from 'react-dom';

class A extends React.Component {
    // static defaultProps = {} //设置默认值。这个是第一个执行的

    constructor(){
        super();
        console.log('constructor');

        this.state = {
            n : 1
        }
    }

    /***********************第一次渲染************************************/
    componentWillMount(){
        console.log('componentWillMount--第一次渲染之前');
    }

    componentDidMount(){
        console.log('componentDidMount--第一次渲染之后');
        /**
         * 从服务器获取数据修改状态，完成数据绑定
         */

         setTimeout(()=>{
             this.setState({
                n : this.state.n + 1
             })
         },3000)
    }

    /***********************重新渲染************************************/
    shouldComponentUpdate(nextProps,nextState){ //nextProps:最新属性 nextState:最新状态
        //这个方法可以用来做性能优化，防止多次重复渲染组件
        console.log('shouldComponentUpdate--是否允许更新--返回true是允许，return false是不允许');
        
        // if(nextState.n == 2){
        //     return false;
        // }

        return true; //允许更新
    }

    componentWillUpdate(nextProps,nextState){
        console.log('componentWillUpdate--组件更新之前');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate--组件更新之后');
    }

    /***********************组件属性改变时，额外会触发这个方法************************************/
    componentWillReceiveProps(nextProps,nextState){
        console.log('componentWillReceiveProps--父组件把传递给子组件的属性发生改变后');
    }

    render(){
        console.log('render')
        return <div>
            {this.state.n}
            {this.props.n}
        </div>
    }
}

class B extends React.Component { //复合组件。B组件用来修改A组件的属性
    constructor(){
        super();
        this.state = {
            m:10
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                m: 20
            })
        },5000)
    }

    render(){
        return <div>
            123
            <A n={this.state.m}/>
        </div>
    }
}

ReactDOM.render(<B/>,document.getElementById('root'))
 
