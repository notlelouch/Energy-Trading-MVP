"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyProvider = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_provider_1 = require("../bsv/abstract-provider");
const crypto_1 = require("crypto");
const utils_1 = require("../bsv/utils");
/**
 * A DummyProvider is build for test purpose only, it always returns a dummy utxo for `listUnspent` request.
 */
class DummyProvider extends abstract_provider_1.Provider {
    constructor(satoshisArray) {
        super();
        this.satoshisArray = satoshisArray;
    }
    isConnected() {
        return true;
    }
    connect() {
        return Promise.resolve(this);
    }
    updateNetwork(_network) {
    }
    getNetwork() {
        return scryptlib_1.bsv.Networks.testnet;
    }
    getFeePerKb() {
        return Promise.resolve(1);
    }
    sendRawTransaction(rawTxHex) {
        return Promise.resolve(rawTxHex);
    }
    getTransaction(txHash) {
        throw new Error("Method not implemented.");
    }
    listUnspent(address, options) {
        // always return a dummy utxo
        if (this.satoshisArray) {
            const utxos = this.satoshisArray.map(u => ({
                txId: (0, crypto_1.randomBytes)(32).toString('hex'),
                outputIndex: 0,
                script: scryptlib_1.bsv.Script.fromAddress(address).toHex(), // placeholder
                satoshis: u
            }));
            if (options) {
                return Promise.resolve((0, utils_1.filterUTXO)(utxos, options));
            }
            return Promise.resolve(utxos);
        }
        return Promise.resolve([{
                txId: (0, crypto_1.randomBytes)(32).toString('hex'),
                outputIndex: 0,
                script: scryptlib_1.bsv.Script.fromAddress(address).toHex(), // placeholder
                satoshis: 9999999999
            }]);
    }
    getBalance(address) {
        throw new Error("Method not implemented.");
    }
}
exports.DummyProvider = DummyProvider;
//# sourceMappingURL=dummy-provider.js.map