# REACT

## React的脚手架

React是一个框架：具备自己开发的独立思想(MVC:model,view,controller)

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
```