"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants = require("../constants/index");
function incrementEnthusiasm() {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    };
}
exports.incrementEnthusiasm = incrementEnthusiasm;
function decrementEnthusiasm() {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    };
}
exports.decrementEnthusiasm = decrementEnthusiasm;
function createAction(type, payload) {
    return payload === undefined ? { type: type } : { type: type, payload: payload };
}
exports.createAction = createAction;
function action(type) {
    return function (payload) { return (payload ? { type: type, payload: payload } : { type: type }); };
}
exports.action = action;
//# sourceMappingURL=index.js.map