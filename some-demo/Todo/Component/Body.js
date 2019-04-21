import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';

class Body extends React.Component {
    constructor() {
        super();
    }

    changeTheState = event => {
        let newState = event.target.checked ? 1 : 0;
        this.props.changeState(parseFloat(event.target.id), newState);
    }

    delete = event => {
        this.props.deleteState(event.target.id);
    }

    render() {

        // console.log(this.props);
        let { data, flag } = this.props;

        data = data.filter(item => {
            if (flag === 'complete') return item.state === 1;
            if (flag === 'uncomplete') return item.state === 0;
            return true; //两个都不是，那么就返回true，既是都要
        })


        return <div>
            <ul>
                {
                    data.map((item, index) => {
                        return <li>
                            <input type="checkbox" id={item.id} checked={item.state === 1 ? true : false} onChange={this.changeTheState} />
                            <label>{item.name}</label>
                            <a id={item.id} style={{ float: 'right', cursor: 'pointer' }} onClick={this.delete}>删除</a>
                        </li>
                    })
                }
            </ul>
            <hr />
        </div>
    }
}

export default connect(state => ({ ...state.todo }), action.todo)(Body);

