"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var Layout_1 = require("./pages/Layout");
require("bootstrap/dist/css/bootstrap.min.css");
// import './App.css';
var BrowserRouter = require("react-router-dom").BrowserRouter;
var store = redux_1.createStore(reducers_1.enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(BrowserRouter, { basename: "/" },
        React.createElement(Layout_1.default, null))), document.getElementById('root'));
//# sourceMappingURL=index.js.map