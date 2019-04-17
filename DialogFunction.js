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