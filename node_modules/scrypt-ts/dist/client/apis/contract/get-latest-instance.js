"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLatestInstanceAction = void 0;
class GetLatestInstanceAction {
    constructor() {
        this.method = "GET";
        this.pathPattern = "/contract/:txId/:outputIndex/utxo";
    }
    serilizeRequest(request) {
        const { contractId } = request;
        return contractId;
    }
    deserilizeResponse(response, requestCtx) {
        if (response.length === 0) {
            throw new Error(`The utxo related to the contract was not found, please check whether the contract artifact has been uploaded.`);
        }
        const instance = requestCtx.clazz.fromLockingScript(response[0].script);
        instance.from = response[0];
        return instance;
    }
}
exports.GetLatestInstanceAction = GetLatestInstanceAction;
//# sourceMappingURL=get-latest-instance.js.map