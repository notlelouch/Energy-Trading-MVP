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
exports.FallbackProvider = void 0;
const abstract_provider_1 = require("../bsv/abstract-provider");
;
const defaultConfig = { stallTimeout: 400, priority: 1, weight: 1 };
function _normalize(value) {
    if (value == null) {
        return "null";
    }
    if (value instanceof Error) {
        return "null";
    }
    if (Array.isArray(value)) {
        return "[" + (value.map(_normalize)).join(",") + "]";
    }
    if (typeof (value) === "object" && typeof (value.toJSON) === "function") {
        return _normalize(value.toJSON());
    }
    switch (typeof (value)) {
        case "boolean":
        case "symbol":
            return value.toString();
        case "bigint":
        case "number":
            return BigInt(value).toString();
        case "string":
            return JSON.stringify(value);
        case "object": {
            const keys = Object.keys(value);
            keys.sort();
            return "{" + keys.map((k) => `${JSON.stringify(k)}:${_normalize(value[k])}`).join(",") + "}";
        }
    }
    throw new Error(`Could not serialize ${value}`);
}
function normalizeResult(value) {
    if ("error" in value) {
        const error = value.error;
        return { tag: _normalize(error), value: error };
    }
    const result = value.result;
    return { tag: _normalize(result), value: result };
}
// This strategy picks the highest weight result, as long as the weight is
// equal to or greater than quorum
function checkQuorum(quorum, results) {
    const tally = new Map();
    for (const { value, tag, weight } of results) {
        const t = tally.get(tag) || { value, weight: 0 };
        t.weight += weight;
        tally.set(tag, t);
    }
    let best = null;
    tally.forEach((r, _) => {
        if (r.weight >= quorum && (!best || r.weight > best.weight)) {
            best = r;
        }
    });
    if (best) {
        return best.value;
    }
    return undefined;
}
function getBestResult(quorum, results) {
    // If any value or error meets quorum, that is our preferred result
    const result = checkQuorum(quorum, results);
    if (result !== undefined) {
        return result;
    }
    // Otherwise, do we have any result?
    for (const r of results) {
        if (r.value) {
            return r.value;
        }
    }
    // Nope!
    return undefined;
}
/**
 *  A Fallback Provider.
 *
 */
class FallbackProvider extends abstract_provider_1.Provider {
    constructor(providers) {
        super();
        this.configs = providers.map((p) => {
            if (p instanceof abstract_provider_1.Provider) {
                return Object.assign({ provider: p }, defaultConfig);
            }
            else {
                return Object.assign({}, defaultConfig, p);
            }
        }).sort((ac, bc) => {
            return bc.priority - ac.priority;
        });
        if (this.configs.length === 0) {
            throw new Error('No providers passed when initializing a FallbackProvider');
        }
        const network = this.configs[0].provider.getNetwork();
        if (!this.configs.every(c => c.provider.getNetwork() === network)) {
            throw new Error('All the providers passed should have the same network when initializing a FallbackProvider');
        }
        this.quorum = 2;
        if (this.quorum > this.configs.reduce((a, c) => (a + c.weight), 0)) {
            throw new Error("quorum exceed provider wieght");
        }
    }
    isConnected() {
        let isConnected = false;
        this.configs.forEach(c => {
            isConnected = isConnected || c.provider.isConnected();
        });
        return isConnected;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._getBestProviderResult((p) => {
                return p.connect();
            });
            return Promise.resolve(this);
        });
    }
    updateNetwork(network) {
        this.configs.forEach(c => c.provider.updateNetwork(network));
    }
    getNetwork() {
        return this.configs[0].provider.getNetwork();
    }
    getFeePerKb() {
        return this._getBestProviderResult((p) => {
            return p.getFeePerKb();
        });
    }
    sendRawTransaction(rawTxHex) {
        return this.perform("sendRawTransaction", (p) => {
            return p.sendRawTransaction(rawTxHex);
        });
    }
    getTransaction(txHash) {
        return this.perform("getTransaction", (p) => {
            return p.getTransaction(txHash);
        });
    }
    listUnspent(address, options) {
        return this.perform("listUnspent", (p) => {
            return p.listUnspent(address, options);
        });
    }
    getBalance(address) {
        return this.perform("getBalance", (p) => {
            return p.getBalance(address);
        });
    }
    _getBestProviderResult(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield Promise.all(this.configs.map(({ provider, weight }) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield req(provider);
                    return Object.assign(normalizeResult({ result: result }), { weight });
                }
                catch (error) {
                    return Object.assign(normalizeResult({ result: 50 }), { weight });
                }
            })));
            const result = getBestResult(this.quorum, results);
            if (result instanceof Error) {
                throw result;
            }
            return result;
        });
    }
    _getFastProviderResult(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield new Promise((resolve, reject) => {
                let fail = 0;
                this.configs.forEach(({ provider, weight }) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield req(provider);
                        resolve(result instanceof abstract_provider_1.Provider ? this : result);
                    }
                    catch (error) {
                        fail++;
                        if (fail >= this.configs.length) {
                            resolve(error);
                        }
                    }
                }));
            });
            return result;
        });
    }
    perform(method, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._getFastProviderResult(req);
            if (result instanceof Error) {
                throw result;
            }
            return result;
        });
    }
}
exports.FallbackProvider = FallbackProvider;
//# sourceMappingURL=provider-fallback.js.map