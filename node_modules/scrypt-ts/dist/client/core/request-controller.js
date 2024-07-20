"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const superagent_1 = __importDefault(require("superagent"));
const scryptlib_1 = require("scryptlib");
var RequestConfigKeys;
(function (RequestConfigKeys) {
    RequestConfigKeys["apiKey"] = "apiKey";
    RequestConfigKeys["network"] = "network";
    RequestConfigKeys["timeout"] = "timeout";
    RequestConfigKeys["maxRetries"] = "maxRetries";
})(RequestConfigKeys || (RequestConfigKeys = {}));
class RequestController {
    constructor(_config, _logger) {
        this._config = _config;
        this._logger = _logger;
    }
    request(requestOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            this._logger.debug(this.constructor.name, `[${requestOpts.method}]request ${requestOpts.pathPattern}`, requestOpts.data);
            let req = (0, superagent_1.default)(requestOpts.method, RequestController.getUrl(this.baseUrl, requestOpts.pathPattern, requestOpts.data))
                .auth(this._config.get(RequestConfigKeys.apiKey), { type: 'bearer' })
                .set('Content-Type', 'application/json')
                .timeout(this._config.get(RequestConfigKeys.timeout, 20000))
                // note: all requests are supposed to be idempotent, so they can be retried safely, see https://ladjs.github.io/superagent/#retrying-requests
                .retry(this._config.get(RequestConfigKeys.maxRetries, 3));
            // Add headers
            for (const key in requestOpts.headers || {}) {
                req = req.set(key, requestOpts.headers[key]);
            }
            // Add data
            if (requestOpts.data) {
                if (requestOpts.method === 'GET') {
                    req = req.query(requestOpts.data);
                }
                else {
                    req = req.send(requestOpts.data);
                }
            }
            try {
                const response = yield req;
                if (response.ok) {
                    return response.body;
                }
                throw new Error(response.text);
            }
            catch (error) {
                this._logger.error(this.constructor.name, error.message);
                throw error;
            }
        });
    }
    get network() {
        return this._config.get(RequestConfigKeys.network, scryptlib_1.bsv.Networks.mainnet);
    }
    get apiKey() {
        return this._config.get(RequestConfigKeys.apiKey, '');
    }
    get baseUrl() {
        const defaultBaseUrl = this.network === scryptlib_1.bsv.Networks.mainnet ? 'https://api.scrypt.io' : 'https://testnet-api.scrypt.io';
        return process.env.BASEURL || defaultBaseUrl;
    }
    static getUrl(baseUrl, pathPattern, data) {
        const pathParams = pathPattern.match(/:\w+/g) || [];
        let path = pathPattern;
        // Replace path params with actual values
        for (const pathParam of pathParams) {
            const paramName = pathParam.replace(":", "");
            const paramVal = data[paramName];
            if (paramVal === undefined) {
                throw new Error(`Missing path argument ${paramName}`);
            }
            if (typeof paramVal !== "string" && typeof paramVal !== "number") {
                throw new Error(`Path argument ${paramName} must be a string or number`);
            }
            path = path.replace(pathParam, paramVal.toString());
        }
        return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=request-controller.js.map