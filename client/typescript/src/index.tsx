import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {enthusiasm} from './reducers';
import {StoreState} from './types';
import Layout from "./pages/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-sortable-tree/style.css';
import './App.css';
const BrowserRouter = require("react-router-dom").BrowserRouter;

const store = createStore<StoreState>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename="/">
        <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));