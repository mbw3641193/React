import React from 'react';
import { connect } from 'react-redux';
import action from '../store/action';

class Footer extends React.Component {
    constructor() {
        super();
        this.state = {
            showData : [
                {name:'全部',flag:'all'},
                {name:'已完成',flag:'complete'},
                {name:'未完成',flag:'uncomplete'},
            ]
        }
    }

    showAll = event => {
        let text = event.target.getAttribute('flag');
        if(this.props.flag === text) return;
        this.props.filter(text);
    }

    render() {

        return <div>
            {
                this.state.showData.map((item,index)=>{
                    return <a 
                    onClick={this.showAll} 
                    flag={item.flag} 
                    style={item.flag === this.props.flag?{cursor:'pointer',padding:'5px 15px',backgroundColor:'#ddd',marginRight:'10px'}:{cursor:'pointer',padding:'5px 15px',backgroundColor:'#eee',marginRight:'10px'}}
                    >
                    {item.name}
                    </a>
                })
            }
        </div>
    }
}

export default connect(state => ({ ...state.todo }), action.todo)(Footer);

