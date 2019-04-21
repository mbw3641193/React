/***
 * 把每一个模块单独设定的action 合并成一个总的 action
 * 
 */
import vote from './vote';
import personal from './personal';
import todo from './todo';

let action = {
    vote,
    personal,
    todo
};

export default action;