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
exports.BsvApi = void 0;
const get_transaction_1 = require("./bsv/get-transaction");
const get_balance_1 = require("./bsv/get-balance");
const send_raw_transaction_1 = require("./bsv/send-raw-transaction");
const list_unspent_1 = require("./bsv/list-unspent");
const get_fee_perkb_1 = require("./bsv/get-fee-perkb");
const connect_1 = require("./bsv/connect");
class BsvApi {
    constructor(_core) {
        this._core = _core;
    }
    getTransaction(txId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new get_transaction_1.GetTransactionAction(), { txId });
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new get_balance_1.GetBalanceAction(), { address });
        });
    }
    getFeePerKB() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new get_fee_perkb_1.GetFeePerKBAction(), {});
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new connect_1.ConnectAction(), {});
        });
    }
    sendRawTransaction(txHex) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new send_raw_transaction_1.SendRawTransactionAction(), { txHex });
        });
    }
    listUnspent(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._core.actionResolver.resolve(new list_unspent_1.ListUnspentAction(), { address, options });
        });
    }
}
exports.BsvApi = BsvApi;
//# sourceMappingURL=bsv-api.js.map