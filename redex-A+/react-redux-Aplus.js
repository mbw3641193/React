import React from 'react';
import PropTypes from 'prop-types';

/**
 * Provider:当前项目的根组件
 *  1. 接收通过属性传递进来的store，把store挂载到上下文中，这样当前项目任何组件都可以通过上下文使用redex中的store
 *  2. 在组件的render中，把传递给provider的子元素渲染
 */
class Provider extends React.Component {
    //设置上下文信息类型
    static childContextTypes = {
        store: PropTypes.object
    };

    //设置上下文信息：return什么，后代就能接收什么
    getChildContext() {
        return {
            store: this.props.store
        }
    }

    // constructor(props,context){
    //     super(props,context);
    // }

    render() {
        return this.props.children;  //渲染传递进来的子元素
    }


}


/**
 * connect:高阶组件(基于高阶函数[科里化函数]创建的组件就是高阶组件)
 *  @param
 *  1.  mapStateToProps:回调函数，把redux中的部分状态信息 挂载到 指定组件的属性上
 *      ```
 *          function mapStateToProps(state){    //state: redux容器中的状态信息
 *              return {};                      //return对象中有啥，就把啥挂载到属性上
 *          }
 *      ```
 * 
 *  2.  mapDispatchToProps:回调函数，把redux中的部分需要派发的任务 挂载到 指定组件的属性上
 *      ```
 *          function mapDispatchToProps(dispatch){    //dispatch: store中的dispatch
 *              return {                        //return对象中有啥，就把啥挂载到属性上
 *                  init(){
 *                      dispatch({...});
 *                  }
 *              }; 
 *          }
 *      ```
 * 
 *  @returns
 *      返回一个新的函数 connectHOT
 * 
 *  ---------------------
 * 
 *  connectHOT
 *  @param
 *      传递进来的是要操作的组件，我们需要把指定的属性和方法都挂载到当前组件的属性上
 * 
 *  @returns
 *      返回一个新的组件Proxy(代理组件)。在代理组件中：
 *      
 *          1. 我们要获取Provider在上下文中存储的store
 *          2. 紧接着获取store中的state和dispatch
 *          3. 把mapStateToProps和mapDispatchToProps执行，接收返回的结果
 *          4. 把结果挂载到Component这个要操作组件的属性上
 *  
 */
function connect(mapStateToProps, mapDispatchToProps) {

    return function connectHOT(Component) {  //返回一个新的函数

        return class Proxy extends React.Component {

            //1. 我们要获取Provider在上下文中存储的store
            static contextTypes = {
                store: PropTypes.object
            };

            //2. 获取store中的state和dispatch,并把mapStateToProps和mapDispatchToProps执行，接收返回的结果
            constructor(props, context) {
                super(props, context);

                this.state = this.queryMountProps();

            }

            //从redux中获取最新的信息，基于回调函数筛选，返回的是需要挂载到组件属性上的信息
            queryMountProps = () => {
                let { store } = this.context,
                    state = store.getState();

                let propsState = typeof mapStateToProps === 'function' ? mapStateToProps(state) : {}; //判断mapStateToProps是不是函数
                let propsDispatch = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(store.dispatch) : {}; //判断mapDispatchToProps是不是函数

                return {
                    ...propsState,
                    ...propsDispatch
                }
            }

            //基于redux中的subscribe向事件池追加一个方法， 当容器状态改变，我们需要重新获取最新的状态信息，并且重新把Component渲染，把最新的状态信息通过属性传递给component
            componentDidMount() {
                this.context.store.subscribe(() => {
                    this.setState(this.queryMountProps());
                })
            }

            render() { //渲染Component组件，并把结果挂载到Component这个要操作组件的属性上

                return <Component {...this.state} />

            }
        }
    }
}

export {
    Provider,
    connect
}