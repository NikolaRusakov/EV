"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
// import MainPage from "./MainPage";
var HomePage_1 = require("./HomePage");
var react_1 = require("react");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // state = {
    //     response: []
    // };
    // componentDidMount() {
    //     callApi('getFile/vocabulary').then(res => {
    //         console.log(res);
    //         this.setState({response: res})
    //     }).catch(err => console.error(err));
    // }
    Layout.prototype.render = function () {
        return React.createElement(reactstrap_1.Container, { fluid: true },
            React.createElement(reactstrap_1.Row, { className: "h-100 ml-1" },
                React.createElement(reactstrap_1.Col, { id: "content", className: "h-100 mt-5", md: 12 },
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { name: "Home", component: HomePage_1.default })))));
    };
    return Layout;
}(react_1.Component));
exports.default = Layout;
//# sourceMappingURL=Layout.js.map