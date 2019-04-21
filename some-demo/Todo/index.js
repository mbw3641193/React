import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import store from '../src/store';

import Head from './Todo/Head'
import Body from './Todo/Body'
import Footer from './Todo/Footer'






ReactDOM.render(<Provider store={store}>
    <div style={{ width:'500px'}}>
        <Head/>
        <Body/>
        <Footer/>
    </div>
</Provider>, document.getElementById('root'));

