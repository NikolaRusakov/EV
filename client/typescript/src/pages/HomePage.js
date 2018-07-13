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
var react_1 = require("react");
// import Loader from '../components/Loader'
var reactstrap_1 = require("reactstrap");
var ItemList_1 = require("../components/ItemList");
var api_1 = require("../api");
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            response: []
        };
        return _this;
    }
    HomePage.prototype.componentDidMount = function () {
        var _this = this;
        api_1.callApi('getFile/vocabulary').then(function (res) {
            console.log(res);
            _this.setState({ response: res });
        }).catch(function (err) { return console.error(err); });
    };
    HomePage.prototype.render = function () {
        // const {data} = this.props;
        // if (!data) {
        // return <Loader/>
        // }
        var response = this.state.response;
        // console.log(response);
        return (React.createElement(reactstrap_1.Row, null,
            React.createElement(reactstrap_1.Col, { lg: "4", key: "homePage" },
                React.createElement(ItemList_1.default, { data: response[0] && response[0] }))));
    };
    return HomePage;
}(react_1.Component));
exports.default = HomePage;
//# sourceMappingURL=HomePage.js.map