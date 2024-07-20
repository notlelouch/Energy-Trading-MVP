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
exports.GorillapoolProvider = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_provider_1 = require("../bsv/abstract-provider");
const whatsonchain_provider_1 = require("./whatsonchain-provider");
const superagent_1 = require("superagent");
/**
 * The GorillapoolProvider is backed by [gorillapool]{@link https://gorillapool.io/swagger/}
 */
class GorillapoolProvider extends abstract_provider_1.Provider {
    constructor(network, apiKey) {
        super();
        this.apiKey = apiKey;
        this._feePerKb = -1;
        this._network = network;
        this._mapiURL = network == scryptlib_1.bsv.Networks.mainnet ?
            'https://mapi.gorillapool.io/mapi/' :
            'https://testnet-mapi.gorillapool.io/mapi/';
        // Still uses WoC API under the hood for stuff like fetching unspent outputs,
        // since GP doesn't provide these without an API key.
        this._provider = new whatsonchain_provider_1.WhatsonchainProvider(network);
    }
    isConnected() {
        return this._provider.isConnected();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._provider.connect();
                this.emit("connected" /* ProviderEvent.Connected */, true);
            }
            catch (error) {
                this.emit("connected" /* ProviderEvent.Connected */, false);
                throw error;
            }
            return Promise.resolve(this);
        });
    }
    updateNetwork(network) {
        this._network = network;
        this.emit("networkChange" /* ProviderEvent.NetworkChange */, network);
    }
    getNetwork() {
        return this._network;
    }
    sendRawTransaction(rawTxHex) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // 1 second per KB
            const size = Math.max(1, rawTxHex.length / 2 / 1024); //KB
            const timeout = Math.max(10000, 1000 * size);
            try {
                const request = (0, superagent_1.post)(this._mapiURL + 'tx')
                    .timeout({
                    response: timeout, // Wait 5 seconds for the server to start sending,
                    deadline: 60000, // but allow 1 minute for the file to finish loading.
                })
                    .set('Content-Type', 'application/octet-stream');
                if (this.apiKey) {
                    request.set('Authorization', `Bearer ${this.apiKey}`);
                }
                const res = yield request.send(Buffer.from(rawTxHex, 'hex'));
                const payload = JSON.parse(res.body.payload);
                if (payload.returnResult === 'success') {
                    return payload.txid;
                }
                else if (payload.returnResult === 'failure') {
                    throw new Error(payload.resultDescription);
                }
            }
            catch (error) {
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.type) === "application/json" && ((_b = error.response) === null || _b === void 0 ? void 0 : _b.body)) {
                    throw new Error(`GorillapoolProvider ERROR: ${JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.body)}`);
                }
                throw new Error(`GorillapoolProvider ERROR: ${error.message}`);
            }
        });
    }
    listUnspent(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._provider.listUnspent(address, options);
        });
    }
    getBalance(address) {
        return this._provider.getBalance(address);
    }
    getTransaction(txHash) {
        return this._provider.getTransaction(txHash);
    }
    getFeePerKb() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._feePerKb < 0) {
                yield this._fetchFeePerKb();
            }
            return Promise.resolve(this._feePerKb);
        });
    }
    _fetchFeePerKb() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = (0, superagent_1.get)(this._mapiURL + 'feeQuote')
                    .timeout({
                    response: 5000,
                    deadline: 10000,
                });
                if (this.apiKey) {
                    request.set('Authorization', `Bearer ${this.apiKey}`);
                }
                const res = yield request;
                const resp = JSON.parse(res.body.payload);
                resp.fees.forEach(element => {
                    if (element.feeType == 'standard') {
                        this._feePerKb = (element.miningFee.satoshis * 1000) / element.miningFee.bytes;
                    }
                });
            }
            catch (error) {
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.type) === "application/json" && ((_b = error.response) === null || _b === void 0 ? void 0 : _b.body)) {
                    throw new Error(`GorillapoolProvider ERROR: ${JSON.stringify((_c = error.response) === null || _c === void 0 ? void 0 : _c.body)}`);
                }
                throw new Error(`GorillapoolProvider ERROR: ${error.message}`);
            }
        });
    }
}
exports.GorillapoolProvider = GorillapoolProvider;
//# sourceMappingURL=gorillapool-provider.js.map