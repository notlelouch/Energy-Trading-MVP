"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Core = void 0;
const action_resolver_1 = require("./action-resolver");
const config_1 = require("./config");
const logger_controller_1 = require("./logger-controller");
const request_controller_1 = require("./request-controller");
class Core {
    constructor() {
        this.config = new config_1.Config();
        this.logger = new logger_controller_1.LoggerController(this.config);
        this.requestController = new request_controller_1.RequestController(this.config, this.logger);
        this.actionResolver = new action_resolver_1.ActionResolver(this.requestController, this.logger);
        this.events = new Map();
    }
    init(config) {
        Object.keys(config).forEach(key => {
            this.config.set(key, config[key]);
        });
        this.config.finishInit();
    }
    getNetWork() {
        return this.requestController.network;
    }
    getApiKey() {
        return this.requestController.apiKey;
    }
    getBaseUrl() {
        return this.requestController.baseUrl;
    }
}
exports.Core = Core;
//# sourceMappingURL=core.js.map