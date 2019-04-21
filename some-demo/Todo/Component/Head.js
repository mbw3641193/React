import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';

class Head extends React.Component {
    constructor() {
        super();
        // this.state = {
        //     val : '',
        // }
    }

    keyUP = event => {
        if(event.keyCode === 13){ //回车键
            // this.setState({
            //     val : event.target.value
            // });
            let val = event.target.value.trim();  //trim 去掉多余空格
            if(val == '') return;
            this.props.add({
                name:val, 
                state:0
            })
            event.target.value = '';
        }
    }

    render() {
        // console.log(this.props);
        
        //筛选未完成的任务数量
        let {data} = this.props,
            len = data.filter(item=>{
                return item['state'] === 0;
            }).length;

        return <div>
            <h3>任务列表[当前未完成的任务数:<span style={{ color:'red',fontWeight:'bold' }}>{len}</span>]</h3>
            <input onKeyUp={this.keyUP} type='text' placeholder='请输入任务名字'/>
            <hr />
        </div>
    }
}

export default connect(state => ({ ...state.todo }), action.todo)(Head);

