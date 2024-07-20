"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTransactionAction = void 0;
const scryptlib_1 = require("scryptlib");
class GetTransactionAction {
    constructor() {
        this.method = 'GET';
        this.pathPattern = '/tx/:txId';
    }
    serilizeRequest(request) {
        return request;
    }
    deserilizeResponse(response, _requestCtx) {
        return new scryptlib_1.bsv.Transaction(response.txHex);
    }
}
exports.GetTransactionAction = GetTransactionAction;
//# sourceMappingURL=get-transaction.js.map