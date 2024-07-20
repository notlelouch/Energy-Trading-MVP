"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectAction = void 0;
class ConnectAction {
    constructor() {
        this.method = 'GET';
        this.pathPattern = '/health';
    }
    serilizeRequest(request) {
        return {};
    }
    deserilizeResponse(response, _requestCtx) {
        return {
            success: response.status === 'ok',
            error: ''
        };
    }
}
exports.ConnectAction = ConnectAction;
//# sourceMappingURL=connect.js.map