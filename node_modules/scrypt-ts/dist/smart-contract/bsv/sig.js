"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bsv = void 0;
const scryptlib_1 = require("scryptlib");
Object.defineProperty(exports, "bsv", { enumerable: true, get: function () { return scryptlib_1.bsv; } });
scryptlib_1.bsv.crypto.Signature.prototype.toByteString = function () {
    return this.toTxFormat().toString('hex');
};
//# sourceMappingURL=sig.js.map