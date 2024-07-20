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
exports.getTransaction = void 0;
const superagent_1 = __importDefault(require("superagent"));
const scryptlib_1 = require("scryptlib");
function getTransaction(network, txId) {
    return __awaiter(this, void 0, void 0, function* () {
        const networkStr = network.name === scryptlib_1.bsv.Networks.mainnet.name ? 'main' : 'test';
        const apiPrefix = `https://api.whatsonchain.com/v1/bsv/${networkStr}`;
        return (0, superagent_1.default)('GET', `${apiPrefix}/tx/${txId}/hex`)
            .timeout(200000)
            .retry(2).then(res => {
            if (res.ok) {
                return new scryptlib_1.bsv.Transaction(res.text);
            }
            else if (res.error) {
                throw res.error;
            }
            else {
                throw `getTransaction error ${txId}`;
            }
        });
    });
}
exports.getTransaction = getTransaction;
//# sourceMappingURL=utils.js.map