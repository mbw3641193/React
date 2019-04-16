// import React from 'react';

function createElement(type, props, ...childrens) {
    /**
     * 1. 返回一个对象，默认有4个属性，type、props、ref、key，最后把这个对象返回
     * 2. 根据传递的参数修改对象 
     *      type        =>      type  
     *      props       =>      大部分属性都赋值给新props对象，如果是ref或者key，需要拿出来，并把新props对象中的两个值删除掉
     *      children    =>      作为新props对象中的一个属性
     */
    let obj = { //创建对象，设置默认属性值
        type: null,
        props: {
            children: '',
        },
        ref: null,
        key: null
    };
    obj = { //es6语法 =>{...obj,type:type,props:props} 用传递的type与props覆盖原有的默认值
        ...obj,
        type,
        props: {
            ...props,
            children:childrens.length<=1 ? (childrens[0] || '') : childrens //childrens中有几个，如果0个，那么就是空；如果有一个，那么是第一个；如果多个返回数组
        }
    };
    //如果有key，把key值拿到外面
    if('key' in obj.props){
        obj.key = obj.props.key;
        obj.props.key = undefined
    }
    //如果有ref，把ref值拿到外面
    if('ref' in obj.props){
        obj.ref = obj.props.ref;
        obj.props.ref = undefined
    }

    return obj;
}

// let obj = createElement(
//     'h1',
//     { id: 'titleBox', className: 'title', style: { color: 'red' }, ref: 'AA', key: '12' },
//     '\u73E0\u5cF0\u57F9\u8BAD'
// );
// console.log(obj)

function render(obj, container, callback) {
    /***
     * 把创建的对象生成对应的dom元素，插入到页面中
     */
    let { type, props } = obj || {},
        newElement = document.createElement(type);

    for (let attr in props) {
        if (!props.hasOwnProperty(attr)) break;  //不是私有的，直接结束遍历
        if (!props[attr]) continue;              //如果当前属性没有值，直接不处理

        let value = props[attr];
        //1. 处理className
        if (attr === 'className') {
            newElement.setAttribute('class', value);
            continue;
        };
        //2. 处理style
        if (attr === 'style') {
            if (value === '') continue;
            for (let key in value) {
                if (value.hasOwnProperty(key)) {
                    newElement['style'][key] = value[key];
                    

                }
            }
            continue;
        }
        //2. 处理children
        if (attr === 'children') {
            /***
             * 三种情况：
             * 不是数组：可能是字符串，可能是对象
             * 可能是个数组
             * 
             * 所以把不是数组 也变成数组
             */
            if( !(value instanceof Array)){
                value = [value];    //不是数组 也变成数组
            }

            value.forEach((item,index) => {
                console.log(item);
                if (typeof item === 'string') {  //如果children内容是一个字符串
                    let text = document.createTextNode(item); //创建了一个文本节点，是一个对象
                    newElement.appendChild(text); //创建了children对象
                }
                //如果children内容是一个对象，那么需要再次执行render方法
                render(item,newElement);
            });

            

            continue;
        }


        newElement.setAttribute(attr, value);

    }
    container.appendChild(newElement);

    callback && callback(); //如果callback存在，就执行



}



// render(obj, document.getElementById('root'), () => {
//     console.log('ok!');
// })


export {
    render,
    createElement
}


/***
 * {
 *   type:'h1',
 *   props:{
 *      id:'titleBox',
 *      className:'title',
 *      style:styleObj,
 *      children:'\u73E0\u5cF0\u57F9\u8BAD', //也可能是一个数组Array[3]
 *      ref:undefined,
 *      key:undefined,
 *   },
 *   ref:'AA',
 *   key:'12',
 *   __proto__:Object.prototype
 * }
 */
