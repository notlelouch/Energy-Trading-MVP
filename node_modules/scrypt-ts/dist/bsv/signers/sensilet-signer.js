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
exports.SensiletSigner = void 0;
const scryptlib_1 = require("scryptlib");
const abstract_signer_1 = require("../abstract-signer");
const utils_1 = require("../utils");
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [sensilet wallet]{@link https://sensilet.com},
 * and dapps can use to interact with the Sensilet wallet
 */
class SensiletSigner extends abstract_signer_1.Signer {
    constructor(provider) {
        super(provider);
    }
    /**
     * Check if the wallet has been authenticated
     * @returns {boolean} true | false
     */
    isAuthenticated() {
        this._initTarget();
        return this._target.isConnect();
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
        if (typeof window.sensilet !== 'undefined') {
            this._target = window.sensilet;
        }
        else {
            throw new Error('sensilet is not installed');
        }
    }
    getConnectedTarget() {
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = yield this.isAuthenticated();
            if (!isAuthenticated) {
                // trigger connecting to sensilet account when it's not authorized.
                try {
                    this._initTarget();
                    const addr = yield this._target.requestAccount();
                    this._address = scryptlib_1.bsv.Address.fromString(addr);
                }
                catch (e) {
                    throw new Error(`Sensilet requestAccount failed: ${e}`);
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
            const sensilet = yield this.getConnectedTarget();
            const address = yield sensilet.getAddress();
            return scryptlib_1.bsv.Address.fromString(address);
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield this.getDefaultAddress();
            return address.network;
        });
    }
    getBalance(address) {
        if (address) {
            return this.connectedProvider.getBalance(address);
        }
        return this.getConnectedTarget().then(target => target.getBsvBalance()).then(r => r.balance);
    }
    getDefaultPubKey() {
        return __awaiter(this, void 0, void 0, function* () {
            const sensilet = yield this.getConnectedTarget();
            const pubKey = yield sensilet.getPublicKey();
            return Promise.resolve(new scryptlib_1.bsv.PublicKey(pubKey));
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
            const sensilet = yield this.getConnectedTarget();
            return sensilet.signMessage(message);
        });
    }
    getSignatures(rawTxHex, sigRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this.getNetwork();
            const inputInfos = sigRequests.flatMap((sigReq) => {
                const addresses = (0, utils_1.parseAddresses)(sigReq.address, network);
                return addresses.map(address => {
                    let scriptHex = sigReq.scriptHex;
                    if (!scriptHex) {
                        scriptHex = scryptlib_1.bsv.Script.buildPublicKeyHashOut(address).toHex();
                    }
                    else if (sigReq.csIdx !== undefined) {
                        scriptHex = scryptlib_1.bsv.Script.fromHex(scriptHex).subScript(sigReq.csIdx).toHex();
                    }
                    return {
                        txHex: rawTxHex,
                        inputIndex: sigReq.inputIndex,
                        scriptHex,
                        satoshis: sigReq.satoshis,
                        sigtype: sigReq.sigHashType || scryptlib_1.DEFAULT_SIGHASH_TYPE,
                        address: address.toString()
                    };
                });
            });
            const sensilet = yield this.getConnectedTarget();
            const sigResults = yield sensilet.signTx({
                list: inputInfos
            });
            return inputInfos.map((inputInfo, idx) => {
                return {
                    inputIndex: inputInfo.inputIndex,
                    sig: sigResults.sigList[idx].sig,
                    publicKey: sigResults.sigList[idx].publicKey,
                    sigHashType: sigRequests[idx].sigHashType || scryptlib_1.DEFAULT_SIGHASH_TYPE
                };
            });
        });
    }
}
exports.SensiletSigner = SensiletSigner;
SensiletSigner.DEBUG_TAG = "SensiletSigner";
//# sourceMappingURL=sensilet-signer.js.map