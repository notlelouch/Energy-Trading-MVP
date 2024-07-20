"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRawTransactionAction = void 0;
class SendRawTransactionAction {
    constructor() {
        this.method = 'POST';
        this.pathPattern = '/tx';
    }
    serilizeRequest(request) {
        return request;
    }
    deserilizeResponse(response, _requestCtx) {
        return response.txId;
    }
}
exports.SendRawTransactionAction = SendRawTransactionAction;
//# sourceMappingURL=send-raw-transaction.js.map