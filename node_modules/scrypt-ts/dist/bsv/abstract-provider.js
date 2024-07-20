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
exports.Provider = void 0;
const events_1 = __importDefault(require("events"));
const scryptlib_1 = require("scryptlib");
/**
 * A Provider is an abstraction of non-account-based operations on a blockchain and is generally not directly involved in signing transaction or data.
 */
class Provider extends events_1.default {
    constructor() {
        super();
        this._isProvider = true;
    }
    _initializeConnection() {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                this.connect().then((self) => {
                    resolve(self);
                }, (error) => {
                    reject(error);
                });
            }, 0);
        });
    }
    _ready() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected()) {
                try {
                    yield this.connect();
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
    /**
   * Get a best guess of the fee for a transaction.
   * @param tx A transaction object to estimate.
   * @returns The estimated fee in satoshis.
   */
    getEstimateFee(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: not right when uncompress publickey 
            const copy = new scryptlib_1.bsv.Transaction(tx.uncheckedSerialize());
            // use a copy bcoz `feePerKb` resets all the signatures for inputs.
            copy.feePerKb(yield this.getFeePerKb());
            return copy.getEstimateFee();
        });
    }
    /**
     * Send a transaction object.
     * @param tx The transaction object to send.
     * @returns A promise which resolves to the hash of the transaction that has been sent.
     * @throws If there is a problem with the `tx` object during serialization.
     */
    sendTransaction(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: fix tx.serialize issue 
            const hex = tx.serialize({ disableIsFullySigned: true });
            const feePerKb = yield this.getFeePerKb();
            const estimateFee = Math.ceil(hex.length / 2 / 1000 * feePerKb);
            // clear cache
            tx['_inputAmount'] = undefined;
            if (tx.getUnspentValue() < estimateFee) {
                throw new Error('invalid fee, fee too low.');
            }
            if (tx.getUnspentValue() > estimateFee * 3) {
                throw new Error('invalid fee, fee too high.');
            }
            return this.sendRawTransaction(hex);
        });
    }
    /**
     * Check if an object is a `Provider`
     * @param value The target object
     * @returns Returns `true` if and only if `object` is a Provider.
     */
    static isProvider(value) {
        return !!(value && value._isProvider);
    }
}
exports.Provider = Provider;
//# sourceMappingURL=abstract-provider.js.map