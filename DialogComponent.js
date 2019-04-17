import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



class Dialog extends React.Component {
    static defaultProps = { //this.props是只读的，不能修改，但是可以给其设置默认值或者设置一些规则(是否必须传递、传递值的类型)
        lx: '系统提示',
        con: '嘿嘿嘿'
    };

    static propTypes = { //facebook开发的给组件传递的属性设置规则的插件，不会影响渲染，只是给一个警告 =>感觉没啥用
        con: PropTypes.string.isRequired //传递的内容需要是一个字符串,并且是必填项
    };

    AA=12;              //es6不支持这么书写，但是babel-react 会在webpack打包的时候给转译
    fn=()=>{
        console.log(1);
    }

    constructor(props) {
        super(props); //此处传递参数props ，等于给Component方法传递实参,所以此类中就可以使用this.props。如果只写super(),虽然创建实例的时候把属性传递进来了，但是没有把属性挂载到实例上，使用this.props获取的结果都是undefined
        /***
         * ES6中继承，使用了constructor，第一行必须设置super执行，相当于React.Component.call(this),也就是call继承，把父类私有的属性继承过来
         * 
         * this.props       //属性集合
         * this.refs        //ref集合(非受控组件中用到)
         * this.context     //上下文(高阶组件中用到)
         * 
         * this.updater
         * 
         *  */


        // props:当render渲染并且把当前类执行创建实例的时候，会把JSX解析出来的props对象传递过来

        console.log(this); //this就是这个类的实例

        console.log(this.AA,this.fn());

    }

    render() {
        console.log(this.props); //不管constructor与super传不传props，在渲染的时候都会把props挂载到此处

        let { lx, con, children } = this.props; //组件的属性是只读的，并且不允许被修改这个属性。只能在static defaultProps中添加规则

        // Object.defineProperty(this.props,'con',{ //修改con属性为可修改的,但是这个方法不可用
        //     writable:true                   
        // });



        return <section>
            <h3>{con}</h3>
            <div>{lx}</div>
            {children}
        </section>
    }
}
console.log(new Dialog);

ReactDOM.render(<div>
    <Dialog lx={2} con='hahaha'>
        <span>123</span>
    </Dialog>
</div>, document.getElementById('root'));

