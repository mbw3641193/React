import action from "../store/action";

/**
 * createStore ：创建redux容器
 * @param
 *  reducer:函数
 * 
 * @returns
 *  store:{
 *      getState,
 *      dispatch,
 *      subscribe
 * }
 */
function createStore(reducer) {
    //创建一个store。state用来存储状态信息，listenArray用来存储事件池中的方法
    let state,  //不用设置初始值，因为第一次dispatch的时候执行reducer，state没有值走的是reducer中赋值的默认值信息。我们自己会在创建容器的时候就把dispatch执行一次，把默认值给state
        listenArray = [];

    //基于dispatch实现任务派发
    function dispatch(action) {
        //1. 执行reducer修改容器中的状态信息，并把返回的state替换原有的state，值得注意的是：state是全部替换，所以reducer中修改状态之前，要先把原始状态信息克隆一份再单个修改
        state = reducer(state, action);

        //2. 通知事件池中的方法执行
        for (let i = 0; i < listenArray.length; i++) {
            let item = listenArray[i];
            if (typeof item === 'function') {
                item();
            } else {  //解决数组塌陷问题
                listenArray.splice(i, 1);
                i--;
            }

        }
    }

    dispatch({  //把dispatch执行一次，把默认值给state
        type: '__INIT_DAFAULT_STATE'
    });

    //获取容器中的状态信息
    function getState() {
        //1. 我们需要保证返回的状态信息不能和容器中的state是同一个堆内存，否则外面获取state后直接就可以修改，不符合dispatch->reducer才能改状态的规范
        // return state;

        // {...state} 是浅克隆，虽然最外层内存地址修改了，但是内部如果还有对象，内部的内存地址不会更改
        // return {...state};

        //我们要采用深克隆：
        return JSON.parse(JSON.stringify(state));
    }

    //向事件池中追加方法
    function subscribe(fn) {
        //1. 向事件池中追加方法
        if (!listenArray.includes(fn)) {  //判断容器中本来是否已经有这个方法
            listenArray.push(fn);
        }

        //2. 返回一个方法。执行返回的方法会把当前绑定的方法在事件池中移除掉
        return function unsubscribe() {
            let index = listenArray.indexOf(fn);    //获取fn的索引
            // listenArray.splice(index,1);            //这么做可能会引发数组塌陷
            //数组塌陷：如果数组遍历执行的时候，后一个数组中元素执行的方法是删除前一个数组中元素，那么索引值会发生改变，导致后面紧跟的数组元素被跳过

            listenArray[index] = null; //解决数组塌陷问题。先设置为null，然后在dispatch遍历的时候解决问题

        }

    }

    return {
        dispatch,
        getState,
        subscribe
    }
}


/**
 * combineReducers ：合并reducer
 * @param
 *  对象，对象中包含了每一个版块对应的reducer{xxx:function reducer,xxx:function reducer...}
 * @returns
 *  一个新的reducer函数
 * 
 * 特殊处理：合并reducer后，redux容器中的state也变成以对应对象管理的方式
 */
function combineReducers(reducers) {
    //reducers:传递进来的reducer对象集合

    //返回一个新的reducer
    return function reducer(state = {}, action) {
        //dispatch派发 执行的时候，执行的是此处返回的reducer，所以这里要返回一个最终的state对象替换原有的state
        //所谓的reducer合并，其实就是dispatch派发的时候，把每个模块的reducer都单独执行一遍，然后把每个模块返回的对象最后汇总，然后替换state

        let newState = {};
        for (let key in reducers) {
            if (reducers.hasOwnProperty(key)) {
                //reducer[key]:每个模块单独的reducer
                //state[key]: 当前模块在redux容器中存储的状态信息
                newState[key] = reducers[key](state[key], action); //返回当前模块最新状态


            }
        }

        return newState;
    }

}


//用法如下：
/******************************************************************/
// let reducer = (state = {}, action) => {
//     /***
//      * 1. state：容器中原有的状态信息，如果没有原有状态，给一个初始默认值
//      * 2. action：dispatch任务派发的时候传递的行为对象，这个对象中必有一个type属性(操作的行为标识)，reducer根据type识别如何修改状态信息
//      */
//     switch (action.type) {   //判断行为标识
//         //根据type不同，执行不同的修改操作
//     }

//     return state; //返回的state会替换原有的state
// }


/******************************************************************/
// let store = createStore(reducer);  //create的时候把reducer传进来，但此时reducer并没有执行。只有dispatch的时候才执行。通过执行reducer修改容器中的状态


/******************************************************************/
// store.dispatch({xxx:'xxx'...})


/******************************************************************/
// let unscribute = store.subscribe;
// unscribute()


/******************************************************************/
// let reducer = combineReducers({
//     vote,
//     personal
// });