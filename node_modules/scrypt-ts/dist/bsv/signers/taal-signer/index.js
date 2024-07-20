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
exports.TAALSigner = void 0;
const abstract_signer_1 = require("../../abstract-signer");
const scryptlib_1 = require("scryptlib");
const utils_1 = require("../../utils");
const bsv_1 = require("bsv");
const globals_1 = require("./globals");
const DEFAULT_SIGHASH_TYPE = scryptlib_1.bsv.crypto.Signature.ALL;
const TAAL_EXTENSION_ID = "engokokaoeppkmchbkjeoeimiffobcke";
class TAALSigner extends abstract_signer_1.Signer {
    constructor(provider, app_name = "APP_NAME") {
        super(provider);
        this._app_name = app_name;
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._port) {
                return true;
            }
            return false;
        });
    }
    requestAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            let isAuthenticated = false;
            let error = '';
            try {
                this._port = chrome.runtime.connect(TAAL_EXTENSION_ID, { name: this._app_name });
                yield this.getDefaultAddress();
                yield this.alignProviderNetwork();
                isAuthenticated = this._port ? true : false;
            }
            catch (e) {
                error = e.toString();
            }
            return {
                isAuthenticated,
                error
            };
        });
    }
    assertIsAuthenticated() {
        if (!this._port) {
            throw new Error('TAAL chrome wallet is not connected!');
        }
    }
    setProvider(provider) {
        throw new Error("cannot alter provider");
    }
    getDefaultAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertIsAuthenticated();
            const response = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.GetAddress);
            return scryptlib_1.bsv.Address.fromString(response.payload);
        });
    }
    getDefaultPubKey() {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertIsAuthenticated();
            const network = yield this.getNetwork();
            const response = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.GetPublicKey);
            const publicKey = new scryptlib_1.bsv.PublicKey(response.payload, {
                network: network
            });
            return Promise.resolve(publicKey);
        });
    }
    getPubKey(address) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(`Method ${this.constructor.name}#getPubKey not implemented.`);
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            this.assertIsAuthenticated();
            const response = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.GetNetwork);
            const network = scryptlib_1.bsv.Networks.get(response.payload);
            return Promise.resolve(network);
        });
    }
    updateInputsWithInfo(tx, inputInfos) {
        tx.inputs.forEach((input, index) => {
            // Find the corresponding inputInfo based on the inputIndex
            const inputInfo = inputInfos.find((info) => info.inputIndex === index);
            if (inputInfo) {
                // Update the input properties using the inputInfo data
                input.output = new scryptlib_1.bsv.Transaction.Output({
                    satoshis: inputInfo.satoshis,
                    script: bsv_1.Script.fromHex(inputInfo.scriptHex),
                });
            }
        });
        return tx;
    }
    signTransaction(tx, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this.getNetwork();
            const address = yield this.getDefaultAddress();
            // Generate default `sigRequests` if not passed by user
            const sigRequests = ((_a = options === null || options === void 0 ? void 0 : options.sigRequests) === null || _a === void 0 ? void 0 : _a.length) ? options.sigRequests :
                tx.inputs.map((input, inputIndex) => {
                    var _a, _b, _c, _d, _e, _f;
                    const useAddressToSign = options && options.address ? options.address :
                        ((_a = input.output) === null || _a === void 0 ? void 0 : _a.script.isPublicKeyHashOut())
                            ? input.output.script.toAddress(network)
                            : address;
                    return {
                        prevTxId: (0, scryptlib_1.toHex)(input.prevTxId),
                        outputIndex: input.outputIndex,
                        inputIndex,
                        satoshis: (_c = (_b = input.output) === null || _b === void 0 ? void 0 : _b.satoshis) !== null && _c !== void 0 ? _c : 0, //satoshis: input.output?.satoshis,
                        address: useAddressToSign,
                        scriptHex: (_f = (_e = (_d = input.output) === null || _d === void 0 ? void 0 : _d.script) === null || _e === void 0 ? void 0 : _e.toHex()) !== null && _f !== void 0 ? _f : '', //scriptHex: input.output?.script?.toHex(),
                        sigHashType: DEFAULT_SIGHASH_TYPE,
                    };
                });
            const rawTxHex = tx.toString();
            const inputInfos = sigRequests.flatMap((sigReq) => {
                const addresses = (0, utils_1.parseAddresses)(sigReq.address, network);
                return addresses.map(address => {
                    return {
                        txHex: rawTxHex,
                        inputIndex: sigReq.inputIndex,
                        scriptHex: sigReq.scriptHex || scryptlib_1.bsv.Script.buildPublicKeyHashOut(address).toHex(),
                        satoshis: sigReq.satoshis,
                        sigtype: sigReq.sigHashType || DEFAULT_SIGHASH_TYPE,
                        address: address.toString()
                    };
                });
            });
            // Modify the transaction object using the inputInfos data
            const updatedTx = this.updateInputsWithInfo(tx, inputInfos);
            this.assertIsAuthenticated();
            const response = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.SignTx, updatedTx);
            const signedTxHex = response.payload;
            // Create a new Transaction object from the signed transaction hex
            const signedTx = new scryptlib_1.bsv.Transaction(signedTxHex);
            // Modify the transaction object using the inputInfos data
            return this.updateInputsWithInfo(signedTx, inputInfos);
        });
    }
    /**
     * Get signatures with api
     * @param rawTxHex a transation raw hex
     * @param sigRequests a `SignatureRequest` array for the some inputs of the transaction.
     * @returns a `SignatureResponse` array
     */
    getSignatures(rawTxHex, sigRequests) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this.getNetwork();
            const payloads = sigRequests.flatMap((sigReq) => {
                const addresses = (0, utils_1.parseAddresses)(sigReq.address, network);
                return addresses.map(address => {
                    let script = sigReq.scriptHex;
                    if (!sigReq) {
                        script = scryptlib_1.bsv.Script.buildPublicKeyHashOut(address).toHex();
                    }
                    else if (sigReq.csIdx !== undefined) {
                        script = scryptlib_1.bsv.Script.fromHex(script).subScript(sigReq.csIdx).toHex();
                    }
                    return {
                        tx: rawTxHex,
                        i: sigReq.inputIndex,
                        script,
                        satoshis: sigReq.satoshis,
                        sighash: sigReq.sigHashType || DEFAULT_SIGHASH_TYPE,
                        address: address.toString()
                    };
                });
            });
            const inputSignatures = yield Promise.all(payloads.map(payload => this.signCustomInput(payload)));
            return inputSignatures.map(s => ({
                inputIndex: s.inputIndex,
                sig: (0, scryptlib_1.toHex)(s.signature),
                publicKey: s.publicKey.toString(),
                sigHashType: s.sigtype
            }));
        });
    }
    signMessage(message, address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address) {
                throw new Error(`${this.constructor.name}#signMessge with \`address\` param is not supported!`);
            }
            this.assertIsAuthenticated();
            const response = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.SignMessage, message);
            return response.payload;
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address) {
                return this.connectedProvider.getBalance(address);
            }
            const response = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.GetBalance);
            return {
                confirmed: response.payload,
                unconfirmed: 0
            };
        });
    }
    signCustomInput(signPreimagePayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootPublicKey = yield this.getDefaultPubKey();
            const signPreimageResponse = yield (0, globals_1.sendAction)(this._port, globals_1.TAALWalletAction.SignPreimage, signPreimagePayload);
            return {
                inputIndex: signPreimagePayload.i,
                sigtype: signPreimagePayload.sighash,
                publicKey: rootPublicKey,
                signature: signPreimageResponse.payload,
            };
        });
    }
}
exports.TAALSigner = TAALSigner;
//# sourceMappingURL=index.js.map