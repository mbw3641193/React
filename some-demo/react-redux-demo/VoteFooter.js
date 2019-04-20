import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';

class VoteFooter extends React.Component {
    constructor(){
        super();
    }

    render(){
        return <div>
            <h5>this is a VoteFooter</h5>
            <button onClick={this.props.support}>支持</button>
            <button onClick={this.props.against}>反对</button>
            <hr/>
        </div>
    }
}

export default connect(state => ({ ...state.vote }), action.vote)(VoteFooter);