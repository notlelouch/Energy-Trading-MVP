"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFeePerKBAction = void 0;
class GetFeePerKBAction {
    constructor() {
        this.method = 'GET';
        this.pathPattern = '/feeperkb';
    }
    serilizeRequest(request) {
        return {};
    }
    deserilizeResponse(response, _requestCtx) {
        return response.satoshis;
    }
}
exports.GetFeePerKBAction = GetFeePerKBAction;
//# sourceMappingURL=get-fee-perkb.js.map