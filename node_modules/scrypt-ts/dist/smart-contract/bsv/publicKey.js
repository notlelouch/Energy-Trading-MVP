"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsv = void 0;
const scryptlib_1 = require("scryptlib");
Object.defineProperty(exports, "bsv", { enumerable: true, get: function () { return scryptlib_1.bsv; } });
scryptlib_1.bsv.PublicKey.prototype.toByteString = function () {
    return this.toHex();
};
//# sourceMappingURL=publicKey.js.map