"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function enthusiasm(state, action) {
    switch (action.type) {
        case constants_1.INCREMENT_ENTHUSIASM:
            return __assign({}, state, { enthusiasmLevel: state.enthusiasmLevel + 1 });
        case constants_1.DECREMENT_ENTHUSIASM:
            return __assign({}, state, { enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) });
        default:
            return state;
    }
}
exports.enthusiasm = enthusiasm;
//# sourceMappingURL=index.js.map