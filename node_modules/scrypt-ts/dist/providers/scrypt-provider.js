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
exports.ScryptProvider = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_provider_1 = require("../bsv/abstract-provider");
const client_1 = require("../client");
class ScryptProvider extends abstract_provider_1.Provider {
    constructor() {
        super();
        this._isConnected = false;
        const networkStr = client_1.Scrypt.getConfig('network', 'mainnet');
        this.network = networkStr === 'mainnet' ? scryptlib_1.bsv.Networks.livenet : scryptlib_1.bsv.Networks.testnet;
        this._initializeConnection();
    }
    isConnected() {
        return this._isConnected;
    }
    connect() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, error } = yield client_1.Scrypt.bsvApi.connect();
                this._isConnected = success;
                if (!success) {
                    throw new Error(error);
                }
                this.emit("connected" /* ProviderEvent.Connected */, true);
            }
            catch (error) {
                this.emit("connected" /* ProviderEvent.Connected */, false);
                throw new Error(`connect failed: ${(_a = error.message) !== null && _a !== void 0 ? _a : "unknown error"}`);
            }
            return this;
        });
    }
    updateNetwork(newwork) {
        this.network = newwork;
        this.emit("networkChange" /* ProviderEvent.NetworkChange */, newwork);
    }
    getNetwork() {
        return this.network;
    }
    getFeePerKb() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ready();
            return client_1.Scrypt.bsvApi.getFeePerKB();
        });
    }
    sendRawTransaction(rawTxHex) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ready();
            return client_1.Scrypt.bsvApi.sendRawTransaction(rawTxHex);
        });
    }
    getTransaction(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ready();
            return client_1.Scrypt.bsvApi.getTransaction(txHash);
        });
    }
    listUnspent(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ready();
            return client_1.Scrypt.bsvApi.listUnspent(address, options);
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._ready();
            return client_1.Scrypt.bsvApi.getBalance(address);
        });
    }
}
exports.ScryptProvider = ScryptProvider;
//# sourceMappingURL=scrypt-provider.js.map