"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUnspentAction = void 0;
const utils_1 = require("../../../bsv/utils");
class ListUnspentAction {
    constructor() {
        this.method = 'GET';
        this.pathPattern = '/address/:address/utxo';
    }
    serilizeRequest(request) {
        return {
            address: request.address.toString(),
            options: request.options,
        };
    }
    deserilizeResponse(response, requestCtx) {
        const address = requestCtx.address.toString();
        response.forEach(item => {
            item['address'] = address;
            return item;
        });
        const options = requestCtx.options;
        if (options) {
            return (0, utils_1.filterUTXO)(response, options);
        }
        return response;
    }
}
exports.ListUnspentAction = ListUnspentAction;
//# sourceMappingURL=list-unspent.js.map