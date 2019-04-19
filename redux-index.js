import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';


//创建容器:同时也要把reducer传递进来(reducer登记所有状态更改方式)

/***
 * reducer作用：
 * 1. 记录了所有状态修改的信息（根据行为标识走不同的修改任务）
 * 2. 修改容器中的状态信息
 */
let reducer = (state = { n: 0, m: 0 }, action) => {
    /***
     * 1. state：容器中原有的状态信息，如果没有原有状态，给一个初始默认值
     * 2. action：dispatch任务派发的时候传递的行为对象，这个对象中必有一个type属性(操作的行为标识)，reducer根据type识别如何修改状态信息
     */

    switch (action.type) { //判断行为标识
        case 'VOTE_SUPPORT':
            state = {
                ...state,
                n: state.n + 1
            }
            break;

        case 'VOTE_AGAINST':
            state = {
                ...state,
                m: state.m + 1
            }
            break;

        // default:
        //     break;
    }

    return state; //只有把随心的state返回，原有的状态才会修改

}

let store = createStore(reducer); 

/***
 * store提供三个方法：
 * 1. dispatch :        派发行为(传递对象。对象中有个type属性),目的是通知reducer修改状态信息
 * 2. subscribe:        事件池追加方法   解绑：unsubscribe
 * 3. getState:         获取最新管理的状态信息
 */

























/******************BOX******************************/
class Box extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            <h1>this is a Box</h1>
            <Header store={store}/>
            <Body store={store}/>
        </div>
    }
}

/******************Header******************************/
class Header extends React.Component {

    constructor(props) {
        super(props);
        
        let {store:{getState}} = this.props,
            {n,m} = getState();

        this.state = {
            n,
            m
        }
    }

    componentDidMount(){
        let {store:{getState,subscribe}} = this.props;

        subscribe(()=>{ //状态改变的时候通知该方法执行
            let {n,m} = getState();
            this.setState({
                n,
                m
            })
        })

    }

    render() {
        return <div>
            <h5>this is header</h5>
            <h2>支持人数:{this.state.n}</h2>
            <h2>反对人数:{this.state.m}</h2>
            <hr />
        </div>
    }
}

/******************Body******************************/
class Body extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    support = () => {
        let {store:{dispatch}} = this.props;
        dispatch({
            type:'VOTE_SUPPORT'
        })
    }

    against = () => {
        let {store:{dispatch}} = this.props;
        dispatch({
            type:'VOTE_AGAINST'
        })
    }

    render() {
        // let {store:{dispatch}} = this.props;
        
        return <div>
            <h5>this is a Body</h5>
            <button onClick={this.support}>支持</button>
            <button onClick={this.against}>反对</button>
        </div>
    }
}

ReactDOM.render(<Box></Box>, document.getElementById('root'))

