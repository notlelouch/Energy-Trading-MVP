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
exports.DefaultProvider = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_provider_1 = require("../bsv/abstract-provider");
const gorillapool_provider_1 = require("./gorillapool-provider");
const provider_fallback_1 = require("./provider-fallback");
const sensible_provider_1 = require("./sensible-provider");
const taal_provider_1 = require("./taal-provider");
const whatsonchain_provider_1 = require("./whatsonchain-provider");
function isTestNet(network) {
    return network == scryptlib_1.bsv.Networks.testnet;
}
/**
 * The default provider is the safest, easiest way to begin developing on Bitcon,
 * and it is also robust enough for use in production.
 */
class DefaultProvider extends abstract_provider_1.Provider {
    constructor(options) {
        super();
        this._providers = [];
        options = options || {
            network: scryptlib_1.bsv.Networks.livenet
        };
        const network = options.network || scryptlib_1.bsv.Networks.livenet;
        this._providers.push(new whatsonchain_provider_1.WhatsonchainProvider(network));
        if (options.taal || isTestNet(network)) {
            this._providers.push(new taal_provider_1.TaalProvider(options.taal));
        }
        if (options.gorillapool || isTestNet(network)) {
            this._providers.push(new gorillapool_provider_1.GorillapoolProvider(network, options.gorillapool));
        }
        if (options.sensible) {
            this._providers.push(new sensible_provider_1.SensibleProvider(network, options.sensible));
        }
        if (this._providers.length === 0) {
            this._providers.push(new whatsonchain_provider_1.WhatsonchainProvider(network));
        }
    }
    get bestProvider() {
        if (this._providers.length === 1) {
            if ('provider' in this._providers[0]) {
                return this._providers[0]['provider'];
            }
            return this._providers[0];
        }
        return new provider_fallback_1.FallbackProvider(this._providers);
    }
    isConnected() {
        return this.bestProvider.isConnected();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bestProvider.connect();
            return this;
        });
    }
    updateNetwork(network) {
        this.bestProvider.updateNetwork(network);
    }
    getNetwork() {
        return this.bestProvider.getNetwork();
    }
    getFeePerKb() {
        return this.bestProvider.getFeePerKb();
    }
    sendRawTransaction(rawTxHex) {
        return this.bestProvider.sendRawTransaction(rawTxHex);
    }
    getTransaction(txHash) {
        return this.bestProvider.getTransaction(txHash);
    }
    listUnspent(address, options) {
        return this.bestProvider.listUnspent(address, options);
    }
    getBalance(address) {
        return this.bestProvider.getBalance(address);
    }
}
exports.DefaultProvider = DefaultProvider;
//# sourceMappingURL=default-provider.js.map