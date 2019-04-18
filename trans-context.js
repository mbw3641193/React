import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';




/******************BOX******************************/
class Box extends React.Component {
    /***
     * 父通过上下文传递信息给子组件
     * 1. 设置子组件上下文的属性类型 
     *      static childContextTypes = {};
     *      需要安装prop-types
     * 
     * 2. 获取子组件上下文(设置子组件上下文的属性信息)
     */
    static childContextTypes = {
        n: PropTypes.number  //设置子组件属性类型
    };

    getChildContext(){  //return的内容，就是给子组件上下文设置的内容
        return {
            n:100
        }
        
    }
    
    constructor(){
        super();
    }

    render(){
        return <div>
            <h1>this is a Box</h1>
            <Header/>
            <Body/>
        </div>
    }
}

/******************Header******************************/
class Header extends React.Component {
    static contextTypes = {
        n : PropTypes.number
    }

    constructor(){
        super();
        console.log(this)
    }

    render(){
        return <div>
            <h5>this is a Header{this.context.n}</h5>
            <hr/>
        </div>
    }
}

/******************Body******************************/
class Body extends React.Component {
    constructor(){
        super();
    }

    render(){
        return <div>
            <h5>this is a Body</h5>
        </div>
    }
}

ReactDOM.render(<Box></Box>,document.getElementById('root'))
 
