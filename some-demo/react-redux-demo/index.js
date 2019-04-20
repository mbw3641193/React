import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from '../src/store';

import VoteBody from './component/VoteBody';
import VoteFooter from './component/VoteFooter';






ReactDOM.render(<Provider store={store}>
    <VoteBody/>
    <VoteFooter/>
</Provider>, document.getElementById('root'));

