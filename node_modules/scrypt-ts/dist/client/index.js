"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BsvApi = exports.ContractApi = exports.ActionError = exports.Scrypt = void 0;
const bsv_api_1 = require("./apis/bsv-api");
const contract_api_1 = require("./apis/contract-api");
const core_1 = require("./core/core");
const core = new core_1.Core();
const bsvApi = new bsv_api_1.BsvApi(core);
const contractApi = new contract_api_1.ContractApi(core);
exports.Scrypt = {
    bsvApi,
    contractApi,
    init(config) {
        core.init(config);
    },
    getConfig(name, defaultValue) {
        return core.config.get(name, defaultValue);
    }
};
var action_resolver_1 = require("./core/action-resolver");
Object.defineProperty(exports, "ActionError", { enumerable: true, get: function () { return action_resolver_1.ActionError; } });
var contract_api_2 = require("./apis/contract-api");
Object.defineProperty(exports, "ContractApi", { enumerable: true, get: function () { return contract_api_2.ContractApi; } });
var bsv_api_2 = require("./apis/bsv-api");
Object.defineProperty(exports, "BsvApi", { enumerable: true, get: function () { return bsv_api_2.BsvApi; } });
//# sourceMappingURL=index.js.map