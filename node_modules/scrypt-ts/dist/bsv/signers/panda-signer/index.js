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
exports.PandaSigner = void 0;
const abstract_signer_1 = require("../../abstract-signer");
const scryptlib_1 = require("scryptlib");
const utils_1 = require("../../utils");
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [panda wallet]{@link https://panda.com},
 * and dapps can use to interact with the panda wallet
 */
class PandaSigner extends abstract_signer_1.Signer {
    constructor(provider) {
        super(provider);
    }
    /**
     * Check if the wallet has been authenticated
     * @returns {boolean} true | false
     */
    isAuthenticated() {
        this._initTarget();
        return this._target.isConnected();
    }
    /**
     * Request wallet authentication
     * @returns A promise which resolves to if the wallet has been authenticated and the authenticate error message
     */
    requestAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            let isAuthenticated = false;
            let error = '';
            try {
                yield this.getConnectedTarget();
                yield this.alignProviderNetwork();
                isAuthenticated = true;
            }
            catch (e) {
                error = e.toString();
            }
            return Promise.resolve({ isAuthenticated, error });
        });
    }
    _initTarget() {
        if (this._target) {
            return;
        }
        if (typeof window.panda !== 'undefined') {
            this._target = window.panda;
        }
        else {
            throw new Error('panda is not installed');
        }
    }
    getConnectedTarget() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = yield this.isAuthenticated();
            if (!isAuthenticated) {
                // trigger connecting to panda account when it's not authorized.
                try {
                    this._initTarget();
                    const res = yield this._target.connect();
                    if (res && res.includes("canceled")) {
                        throw new Error(res);
                    }
                }
                catch (e) {
                    throw new Error(`panda requestAccount failed: ${e}`);
                }
            }
            return this._target;
        });
    }
    setProvider(provider) {
        throw new Error("cannot alter provider");
    }
    getDefaultAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const address = yield panda.getAddresses();
            return scryptlib_1.bsv.Address.fromString(address.bsvAddress);
        });
    }
    /**
     * get ordinals address of panda wallet
     * @returns
     */
    getOrdAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const address = yield panda.getAddresses();
            return scryptlib_1.bsv.Address.fromString(address.ordAddress);
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getDefaultAddress();
            return Promise.resolve(address.network);
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address) {
                return this.connectedProvider.getBalance(address);
            }
            const panda = yield this.getConnectedTarget();
            const balance = yield panda.getBalance();
            return Promise.resolve({ confirmed: balance.satoshis, unconfirmed: 0 });
        });
    }
    getDefaultPubKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const pubKey = yield panda.getPubKeys();
            return Promise.resolve(new scryptlib_1.bsv.PublicKey(pubKey.bsvPubKey));
        });
    }
    /**
     * get ordinal PubKey of panda wallet
     * @returns a PubKey
     */
    getOrdPubKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const pubKey = yield panda.getPubKeys();
            return Promise.resolve(new scryptlib_1.bsv.PublicKey(pubKey.ordPubKey));
        });
    }
    /**
     * get all ordinals nft
     * @returns a list of Ordinals
     */
    getOrdinals() {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const ordinals = yield panda.getOrdinals();
            return Promise.resolve(ordinals);
        });
    }
    /**
     * transfer ordinal nft
     * @param options
     * @returns transfer transaction id
     */
    transferOrdinal(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const txid = yield panda.transferOrdinal(options);
            return Promise.resolve(txid);
        });
    }
    getPubKey(address) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`Method ${this.constructor.name}#getPubKey not implemented.`);
        });
    }
    signMessage(message, address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address) {
                throw new Error(`${this.constructor.name}#signMessge with \`address\` param is not supported!`);
            }
            const panda = yield this.getConnectedTarget();
            const res = yield panda.signMessage({ message });
            return res.sig;
        });
    }
    getSignatures(rawTxHex, sigRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            const panda = yield this.getConnectedTarget();
            const network = yield this.getNetwork();
            const sigRequests_ = sigRequests.map(sigReq => ({
                prevTxid: sigReq.prevTxId,
                outputIndex: sigReq.outputIndex,
                inputIndex: sigReq.inputIndex,
                satoshis: sigReq.satoshis,
                address: (0, utils_1.parseAddresses)(sigReq.address, network).map(addr => addr.toString()),
                script: sigReq.scriptHex,
                sigHashType: sigReq.sigHashType,
                csIdx: sigReq.csIdx,
                data: sigReq.data,
            }));
            const sigResults = yield panda.getSignatures({
                rawtx: rawTxHex,
                sigRequests: sigRequests_
            });
            return sigResults.map(sigResult => (Object.assign(Object.assign({}, sigResult), { publicKey: sigResult.pubKey })));
        });
    }
}
exports.PandaSigner = PandaSigner;
PandaSigner.DEBUG_TAG = "PandaSigner";
//# sourceMappingURL=index.js.map