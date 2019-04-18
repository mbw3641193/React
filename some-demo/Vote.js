import React from 'react';
import ReactDOM from 'react-dom';


//这是一个完成的类声明demo
class Vote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            supportNum: 0,
            againstNum: 0
        }

    }

    componentDidMount() {

    }

    // support(event) {
    // console.log(this);
    //this是undefined；event.target也可以获取当前的元素，但是我们不会去操作dom，所以也不用这个方法
    //所以要想办法让方法中的this变成当前类的实例，这样就可以操作属性和状态等信息
    //1.修改JSX：<button onClick={this.support.bind(this)}>支持</button>
    //2.修改support方法为箭头函数 => 最常用的方式
    // }

    //支持
    support = event => {
        // console.log(this);
        this.setState({
            supportNum: this.state.supportNum + 1
        })
    }
    //反对
    against = event => {
        this.setState({
            againstNum: this.state.againstNum + 1
        })
    }

    render() {
        let { supportNum: n, againstNum: m } = this.state;
        let rate = (n + m) === 0 ? '0%' : ((n / (n + m) * 100).toFixed(2) + '%');

        return <div>
            <h3>{this.props.title}</h3>
            <p>支持人数:<b>{n}</b></p>
            <p>反对人数:<b>{m}</b></p>
            <h4>支持率:<b>{rate}</b></h4>
            <div><button onClick={this.support}>支持</button><button onClick={this.against}>反对</button></div>
        </div>;
    }
}

ReactDOM.render(<div>
    <Vote title='世界杯决赛，法国队夺冠' />
    <Vote title='世界杯决赛，中国队夺冠' />


</div>, document.getElementById('root'));