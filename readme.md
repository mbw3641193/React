# REACT

## React的脚手架

React是一个渐进式框架：具备自己开发的独立思想(MVC:model,view,controller)

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

## react-dom  :  把JSX语法渲染成真实dom 的组件

```
ReactDOM.render([JSX],[container],[callback])    //把JSX元素渲染到页面中,callback一般不用
                                                //JSX:虚拟dom   container:容器    callback:当把内容放到页面中时触发的回调函数，一般不用

```

## JSX

react独有的语法 ：JAVASCRIPT + XML(HTML)