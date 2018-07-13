import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-sortable-tree/style.css';
// import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import Layout from "./pages/Layout";

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter basename={"/"}>
            <Layout />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));    