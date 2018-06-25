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
var ItemList = /** @class */ (function (_super) {
    __extends(ItemList, _super);
    function ItemList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemList.prototype.render = function () {
        var data = this.props.data;
        console.log(data);
        return React.createElement(reactstrap_1.ListGroup, null,
            React.createElement("h1", null, data._id),
            data.map(function (item) {
                return item.data.map(function (i, index) { return [
                    React.createElement("h5", null, i.id),
                    i.items.map(function (vocab) {
                        return React.createElement(reactstrap_1.ListGroupItem, { tag: "button", action: true }, vocab);
                    })
                ]; });
            }));
    };
    return ItemList;
}(React.Component));
exports.default = ItemList;
//# sourceMappingURL=ItemList.js.map