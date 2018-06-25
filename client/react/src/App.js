"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./App.css");
// import Hello from './components/Hello';
var logo = require('./logo.svg');
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement("div", { className: "App-header" },
            React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
            React.createElement("h2", null, "Welcome to React")),
        React.createElement("p", { className: "App-intro" },
            "To get started, edit ",
            React.createElement("code", null, "src/App.tsx"),
            " and save to reload.")));
}
exports.default = App;
//# sourceMappingURL=App.js.map