import React from 'react';
import ReactDOM from 'react-dom';

/******************Header******************************/
class Header extends React.Component {
    constructor(){
        super();
    }

    render(){
        return <div>
            <h5>this is a Header</h5>
            <h3>点击次数:{this.props.count}</h3>
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
            <div><button onClick={this.props.callback}>点我增加次数</button></div>
            <hr/>
        </div>
    }
}

/******************BOX******************************/
class Box extends React.Component {
    constructor(){
        super();
        this.state = {
            n : 0
        }
    }

    fn = () => {
        this.setState({
            n: this.state.n + 1
        })
    }

    render(){
        return <div>
            <h1>this is a Box</h1>
            <hr/>
            {/**父组件把信息通过属性传递给子组件 */}
            <Header count={this.state.n}/>
            {/**父组件把一个方法通过属性传递给子组件，目的是在子组件中执行这个方法 */}
            <Body callback={this.fn}/>
        </div>
    }
}

ReactDOM.render(<Box></Box>,document.getElementById('root'))
 
