"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
exports.INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
exports.DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
exports.SET_DATABASE = function (name) {
    return "[" + name + "_db] set database";
};
exports.Actions = {
    setDb: function (db, name) { return actions_1.createAction(exports.SET_DATABASE(name), db); }
};
//# sourceMappingURL=index.js.map