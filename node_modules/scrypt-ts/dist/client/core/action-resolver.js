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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResolver = exports.ActionError = void 0;
const request_controller_1 = require("./request-controller");
class ActionError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ActionError = ActionError;
class ActionResolver {
    constructor(_requestController, _loggerController) {
        this._requestController = _requestController;
        this._loggerController = _loggerController;
    }
    resolve(action, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRequest = action.serilizeRequest(request);
            const jsonResponse = yield this._requestController.request({
                pathPattern: action.pathPattern,
                method: action.method,
                data: jsonRequest,
            });
            if (jsonResponse.statusCode !== 0) {
                const url = request_controller_1.RequestController.getUrl('/', action.pathPattern, jsonRequest);
                const msg = `Action [${action.method} ${url}] failed with error code ${jsonResponse.statusCode}, ${jsonResponse.errorMsg}`;
                this._loggerController.error(this.constructor.name, msg, jsonResponse.data || '');
                throw new ActionError(jsonResponse.statusCode, jsonResponse.errorMsg);
            }
            return action.deserilizeResponse(jsonResponse.data, request);
        });
    }
}
exports.ActionResolver = ActionResolver;
//# sourceMappingURL=action-resolver.js.map