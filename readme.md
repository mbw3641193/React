# REACT

## React的脚手架

React是一个渐进式MVC框架：具备自己开发的独立思想(MVC:model,view,controller)

React全家桶：react / react-dom / react-router / redux / react-redux / axios / ant / dva / saga / mobx ...

1. 划分组件开发
2. 基于路由的SPA单页面开发
3. 基于ES6编写代码
4. 使用webpack来完成编译和打包

#### 前段工程化开发

1. 基于框架的组件化/模块化开发
2. 基于webpack的自动部署

###### 但是配置webpack是一个相对复杂的工作，需要自己安装很多的包与书写相对复杂的配置，所以引入脚手架


#### 脚手架

可以快速构建一套完整的自动化工程项目结构，有助于提高开发效率

```
Vue : VUE-CLI
React : CREATE-REACT-APP
```

#### CREATE-REACT-APP的使用

```
$ npm install create-react-app -g       //  安装在全局环境下，可以使用命令操作    
                                        //  MAC电脑安装的时候需要加sudo，否则没有权限

$ create-react-app [项目名称]           //  基于脚手架命令，创建出一个基于react的自动化/工程化项目目录
                                        //  项目名称中不能出现大写字母、中文汉字、特殊符号等
```

##### 目录内容
```
1. node_modules         //当前项目中依赖的包都在这里      
                        //.bin文件夹：本地项目中可执行命令，在package.json的scripts配置对应的脚本即可
                        //react-scripts命令：

2. public               //存放的是当前项目的HTML页面，如果是SPA应用，那么只有一个index.html
                        //react框架中，使用import方式导入，绝对不能用相对路径(./或../)方式导入资源，因为webpack会把相对地址改变
                        //如果不用import，可以用 %PUBLIC_URL% 方式导入，代表的是public文件夹

3. src                  //项目结构中最重要的目录，因为后期所有的js、路由、组件等都是在放到这里面(包括css、图片)

4. package.json    

    "dependencies": {
        "react": "^16.8.6",                     //react核心模块
        "react-dom": "^16.8.6",                 //react核心模块
        "react-scripts": "2.1.8"                //集成了webpack需要的内容(babel,css,eslint,webpack...)，没有less/sass处理，自己安装
    },

    "scripts": {
        "start": "react-scripts start",         //开发环境
        "build": "react-scripts build",         //打包，生成build文件夹
        "test": "react-scripts test",
        "eject": "react-scripts eject"          //把隐藏在node_modules中的webpack配置项暴露到项目中
    },


```

## React脚手架的深入剖析

create-react-app 脚手架为了让结构目录清晰，把安装的webpack以及配置文件都集成在了react-scripts模块中，放到了node_modules中

真实项目中，我们需要在脚手架默认安装的基础上，额外安装一些我们需要的模块，例如react-router-dom/axios... 以及 less/less-loader...

*** 
1. 如果我们安装其他的组件，但是安装成功后不需要修改webpack配置项，此时我们直接安装并且调用即可

2. 我们安装的插件是基于webpack处理的，那么就需要重新修改webpack配置项

    - 首先需要把隐藏在node_modules中的webpack配置项暴露到项目中 

    - 再去修改对应的配置项即可    

###### 暴露方法

`$ npm run eject` 该操作不可逆转，并且使用前需要先提交git 

一旦暴露，项目目录中会多出两个文件夹：
```
    config    存放的是webpack的配置文件

    scripts   存放的是可执行脚本的js文件
    
        start.js : npm run start 执行的代码
        build.js : npm run build 执行的代码
```

举例：需要安装less
```
1. npm install less less-loader --save  //less是开发跟生产环境下都需要配置的

2.  修改    const cssRegex = /\.(css|less)$/;
            const cssModuleRegex = /\.module\.(css|less)$/;

3.  添加    在css-loader最后添加 
            {
                loader: require.resolve('less-loader'),
            },



set HTTPS=true&&npm start         //开启https模式

set PORT=63341&&npm start         //更换端口号
```
***

## react  :  REACT框架核心部分

- 提供了Component类可以供我们进行组件开发

- 提供了钩子函数(生命周期函数) ---- 所有的生命周期函数 都是基于回调函数完成

***

## react-dom  :  把JSX语法渲染成真实dom 的组件

```
ReactDOM.render([JSX],[container],[callback]) 

//把JSX元素渲染到页面中,callback一般不用
//JSX:虚拟dom   container:容器    callback:当把内容放到页面中时触发的回调函数，一般不用

let data = 'mbw';
ReactDOM.render(<div id="box">hello world! {data}</div>, document.getElementById('root'), ()=>{
    let oBox = document.getElementById('box');
    console.log(oBox.innerHTML);
});

```

***

## JSX

react独有的语法 ：JAVASCRIPT + XML(HTML)

***
- 不建议把JSX直接渲染到body当中，而是放在自己创建的容器中。一般我们都放在一个id为root的div当中即可

- 在JSX中出现的{}是存放JS的，但是其中的JS必须要有返回结果
    {}中不能直接放一个对象类型的值(对象，含有对象的数组，函数都不行)
    {}中判断语句基本都不支持，但是支持map与三元运算符，map遍历的时候需要一个唯一KEY值

- 给元素设置样式用的是className   className = "box"

- style中不能直接的写样式字符串，需要基于一个样式对象来遍历赋值  style={{color:'red'}}
***

## JSX变为真实dom 原理

```
//参考项目中的JSX个人手写源码
import {render,createElement} from './JSX_A+'

let obj = createElement(
    'h1',                                                                                       //=> type
    { id: 'titleBox', className: 'title', style: { color: 'red' }, ref: 'AA', key: '12' },      //=> props
    '系统提示',                                                                                 //=> children
    createElement(
        'h2',
        { id: 'titleBox1', className: 'title1', style: { color: 'green' } },
        '系统提示',
    ),
    createElement(
        'h3',
        { id: 'titleBox3', className: 'title3', style: { color: 'black' } },
        '系统提示',
    ),
);
console.log(obj);
render(obj, document.getElementById('root'), () => {
    console.log('ok!');
})

```
## REACT 组件

不管是vue还是react框架，设计之初都是期望我们按照'组件/模块管理'的方式来构建程序的。

#### 优势

1. 有助于多人协作开发

2. 开发的组件可以被复用

#### REACT组件的创建有两种方式

1. 函数声明式组件（查看Dialog.js）

    - 操作简单，但是功能较少，只是简单的调取和返回而已
    - 静态组件，组件中的内容调取的时候就已经固定了，很难再修改

2. 基于继承Component类来创建组件（查看DialogComponent.js）

    - 操作复杂，但是可以实现复杂功能
    - 能够使用生命周期函数操作业务
    - 可以基于组件内部的状态来动态更新渲染的内容
    - ...

- createElement在处理的时候，遇到一个组件，返回的对象中type不再是字符串标签名，而是一个函数或者是一个类，但是属性还是存在props中

```
//函数声明式组件demo
//index.js
ReactDOM.render(<div>
    <Dialog con='哈哈哈' lx={2}>
        <span>1</span>
    </Dialog>
</div>, document.getElementById('root'));



//Dialog.js
import React from 'react';

/***
 * 函数声明式组件
 * 1. 函数返回结果是一个JSX
 * 2. PROPS变量存储的是一个对象，包含了调取组件时候传递的属性值（不传递也是个空对象）
 */
export default function Dialog(props) {
    let { con, lx = 0 ,children} = props,
        title = lx === 0 ? 'MBW' : 'mbw';
//children 可能有可能没有，可能是值也可能是数组，但是都代表双闭合组件中的子元素
    return <section>
        <h2>{title}</h2>
        <div>{con}</div>
        {/**把属性中的子元素放到组件中的指定位置 */}
        {children}
        {/**也可以基于REACT中提供的专门遍历children的方法来完成遍历操作，一般用的不多 */}
        {/* {React.Children.map(children,item=>item)} */}
    </section>
}


//这是 Dialog.js return返回的对象
{
    type:Dialog,
    props:{
        lx:2,
        con:'哈哈哈',
        children:可能是一个值或者是一个数组
    }
}
```
###### render渲染的时候需要做处理。

- type如果是字符串，就创建一个标签；

- type如果是函数，就把函数执行（方法中的this是undefined），把props中的每一项（包括children）传递给函数；在执行函数的时候，把函数中return的JSX转换为新的对象（通过createElement），把这个对象返回，并按照以往Render的渲染方式，创建dom，并插入到指定容器即可；

- type如果是类，会把当前类 new执行，创建类的一个实例（当前调取的就是他的实例）。new的时候会执行constructor，执行constructor后会执行this.render()，把render返回的JSX拿过来渲染。所以类声明式组件中必须有一个render方法，方法中返回一个JSX元素

- 不管是哪种方式，最后都会把解析出来的props属性对象作为实参传递给对应的函数或者类



## REACT中组件的两个重要概念

### 1.属性

> 属性是只读的，是调取组件的时候传递过来的信息

### 2.状态

###### 参考 DialogComponent.js 与 state-function.js

> 状态是读写的，是自己在组件中设定跟规划的(只有 类声明式 才有状态的管控)


### 类声明中的方法要用箭头函数 -- 参考 Vote.js

```
support(event) {
    console.log(this);

    //this是undefined；event.target也可以获取当前的元素，但是我们不会去操作dom，所以也不用这个方法
    //所以要想办法让方法中的this变成当前类的实例，这样就可以操作属性和状态等信息
    //1.修改JSX：<button onClick={this.support.bind(this)}>支持</button>
    //2.修改support方法为箭头函数 => 最常用的方式
}

support = event => {
    console.log(this);
}

```

### refs

>react中专门提供 通过操作dom来实现需求的方式

refs是一个对象，存储了当前组件中所有设置ref属性的元素

```
//JSX中：
<span ref='spanleft'></span>

//获取span节点：
this.refs.spanleft
```
***
- 基于REF操作DOM实现试图更新的，叫做'非受控组件'

- 基于数据驱动(修改状态数据，react帮助我们重新渲染视图)完成的组件叫做'受控组件(受数据控制的组件)'
***

### REACT的双向数据绑定--onChange

```
//class:
changeVal=event=>{
    this.setState({
        test : event.target.value
    })
}

//JSX:
<input type="text" value={this.state.test} onChange={this.changeVal}/>

```

### 生命周期函数(钩子函数) -- 参考 lifeCircle.js

描述一个组件或者程序从创建到销毁的过程。我们可以在过程中间基于钩子函数完成一些自己的操作

##### 1.基本流程

- constructor               创建一个组件
- componentWillMount        第一次渲染之前
- render                    正在第一次渲染 
- componentDidMount         第一次渲染之后

##### 2.修改流程  

###### 当组件状态数据发生改变(setState) 或者 传递给组件的属性发生改变(即重新调用组件传递不同属性),都会引起差异渲染(dom-diff)

- shouldComponentUpdate     是否允许组件重新渲染
- componentWillUpdate       重新渲染之前
- render                    重新渲染
- componentDidUpdate        重新渲染之后

- componentWillReceiveProps     父组件把传递给子组件的属性发生改变后

##### 3.销毁流程

###### 原有渲染的内容不消失，只不过以后不能基于数据改变视图了

- componentWillUnmount      卸载组件之前(一般不用)




## 复合组件之间的信息传递 

- 父组件把信息传递给子组件  ---1.通过props传递(参考 trans-props.js )  2.基于上下文传递(参考 trans-context.js )

- 子组件把信息传递给父组件  ---把父组件中的方法作为属性传递给子组件，子组件执行方法(相当于执行父组件方法)


## 复合组件之间的信息传递 

> 基于REDUX进行状态管理，实现组件之间的信息传输(最常用的方案)

## REDUX

可以应用在任何项目中，react、vue、Jq项目都可以使用。react-redux才是专门给react项目提供的方案