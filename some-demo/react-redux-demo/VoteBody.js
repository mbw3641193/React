import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';

class VoteBody extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);

        return <div>
            <h5>this is a VoteBody</h5>
            <h3>支持次数:{this.props.n}</h3>
            <h3>反对次数:{this.props.m}</h3>
            <hr />
        </div>
    }
}

// let mapStateToProps = (state) => {       //把redux容器中的状态信息遍历，赋值给当前组件的属性 state:redux容器中的状态信息
//     return {    //返回的是什么，就把什么挂载到当前组件的属性上
//         ...state.vote

//     }
// }

// let mapDispatchToProps = (dispatch) => {    //把redux中的dispatch遍历，赋值给当前组件的属性 dispatch:store中存储的dispatch方法
//     return {    //返回的是什么方法，就把什么方法挂载到当前组件的属性上:一般我们挂载一些方法，用于完成dispatch的派发操作
//         support(){
//             dispatch(action.vote.support());
//         }
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(VoteBody);

export default connect(state => ({ ...state.vote }), action.vote)(VoteBody);
//react-redux 帮我们把 action-creator中编写的方法(返回action对象的方法)，自动构建成dispatch派发任务的方法，也就是mapDispatchToProps这种格式