"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBalanceAction = void 0;
class GetBalanceAction {
    constructor() {
        this.method = 'GET';
        this.pathPattern = '/address/:address/balance';
    }
    serilizeRequest(request) {
        return { address: request.address.toString() };
    }
    deserilizeResponse(response, _requestCtx) {
        return response;
    }
}
exports.GetBalanceAction = GetBalanceAction;
//# sourceMappingURL=get-balance.js.map