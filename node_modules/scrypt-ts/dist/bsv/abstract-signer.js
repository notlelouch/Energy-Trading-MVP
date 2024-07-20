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
exports.Signer = exports.DEFAULT_SIGHASH_TYPE = void 0;
const scryptlib_1 = require("scryptlib");
exports.DEFAULT_SIGHASH_TYPE = scryptlib_1.bsv.crypto.Signature.ALL;
/**
 * A `Signer` is a class which in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to perform operations.
 */
class Signer {
    constructor(provider) {
        this._isSigner = true;
        this.provider = provider;
    }
    // Signing
    /**
     * Sign a raw transaction hex string.
     *
     * @param rawTxHex The raw transaction hex to sign.
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the signed transaction hex string.
     * @throws If any input of the transaction can not be signed properly.
     */
    signRawTransaction(rawTxHex, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const signedTx = yield this.signTransaction(new scryptlib_1.bsv.Transaction(rawTxHex), options);
            return signedTx.toString();
        });
    }
    /**
     * Sign a transaction object. By default only signs inputs, which are unlocking P2PKH UTXO's.
     * @param tx The transaction object to sign.
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the signed transaction object.
     */
    signTransaction(tx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const network = yield this.getNetwork();
            const sigReqsByInputIndex = ((options === null || options === void 0 ? void 0 : options.sigRequests) || []).reduce((m, sigReq) => { m.set(sigReq.inputIndex, sigReq); return m; }, new Map());
            tx.inputs.forEach((input, inputIndex) => {
                if (input.output) {
                    const sigReq = sigReqsByInputIndex.get(inputIndex);
                    if (!sigReq) {
                        return;
                    }
                    const scriptFromOptions = sigReq.scriptHex ? sigReq.scriptHex : scryptlib_1.bsv.Script.buildPublicKeyHashOut(sigReq.address.toString()).toHex();
                    if (scriptFromOptions !== input.output.script.toHex()) {
                        throw new Error(`\`SignatureRequest\` script is not match the script of input: ${inputIndex}`);
                    }
                    if (sigReq.satoshis !== input.output.satoshis) {
                        throw new Error(`\`SignatureRequest\` satoshis is not match the satoshis of input: ${inputIndex}`);
                    }
                }
                else {
                    const sigReq = sigReqsByInputIndex.get(inputIndex);
                    if (!sigReq) {
                        throw new Error(`\`SignatureRequest\` info should be provided for the input ${inputIndex} to call #signTransaction`);
                    }
                    const script = sigReq.scriptHex ? new scryptlib_1.bsv.Script(sigReq.scriptHex) : scryptlib_1.bsv.Script.buildPublicKeyHashOut(sigReq.address.toString());
                    // set ref output of the input
                    input.output = new scryptlib_1.bsv.Transaction.Output({
                        script,
                        satoshis: sigReq.satoshis
                    });
                }
            });
            // Generate default `sigRequests` if not passed by user
            const sigRequests = tx.inputs.map((input, inputIndex) => {
                var _a, _b, _c, _d, _e;
                if ((_b = (_a = input.output) === null || _a === void 0 ? void 0 : _a.script) === null || _b === void 0 ? void 0 : _b.isPublicKeyHashOut()) {
                    const useAddressToSign = input.output.script.toAddress(network);
                    return {
                        prevTxId: (0, scryptlib_1.toHex)(input.prevTxId),
                        outputIndex: input.outputIndex,
                        inputIndex,
                        satoshis: (_c = input.output) === null || _c === void 0 ? void 0 : _c.satoshis,
                        address: useAddressToSign,
                        scriptHex: (_e = (_d = input.output) === null || _d === void 0 ? void 0 : _d.script) === null || _e === void 0 ? void 0 : _e.toHex(),
                        sigHashType: exports.DEFAULT_SIGHASH_TYPE,
                    };
                }
                else {
                    return undefined;
                }
            }).filter(inputInfo => typeof inputInfo === 'object');
            const sigResponses = yield this.getSignatures(tx.toString(), sigRequests);
            // Set the acquired signature as an unlocking script for the transaction
            tx.inputs.forEach((input, inputIndex) => {
                var _a;
                const sigResp = sigResponses.find(sigResp => sigResp.inputIndex === inputIndex);
                if (sigResp && ((_a = input.output) === null || _a === void 0 ? void 0 : _a.script.isPublicKeyHashOut())) {
                    const unlockingScript = new scryptlib_1.bsv.Script("")
                        .add(Buffer.from(sigResp.sig, 'hex'))
                        .add(Buffer.from(sigResp.publicKey, 'hex'));
                    input.setScript(unlockingScript);
                }
            });
            return tx;
        });
    }
    /**
     * Get the connected provider.
     * @returns the connected provider.
     * @throws if no provider is connected to `this`.
     */
    get connectedProvider() {
        if (!this.provider) {
            throw new Error(`the provider of signer ${this.constructor.name} is not set yet!`);
        }
        return this.provider;
    }
    /**
     * Sign transaction and broadcast it
     * @param tx A transaction is signed and broadcast
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the transaction id.
     */
    signAndsendTransaction(tx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tx.sealAsync();
            const signedTx = yield this.signTransaction(tx, options);
            yield this.connectedProvider.sendTransaction(signedTx);
            return signedTx;
        });
    }
    ;
    /**
     * Get a list of the P2PKH UTXOs.
     * @param address The address of the returned UTXOs belongs to.
     * @param options The optional query conditions, see details in `UtxoQueryOptions`.
     * @returns  A promise which resolves to a list of UTXO for the query options.
     */
    listUnspent(address, options) {
        // Default implementation using provider. Can be overriden.
        return this.connectedProvider.listUnspent(address, options);
    }
    /**
     * Get the balance of BSVs in satoshis for an address.
     * @param address The query address.
     * @returns A promise which resolves to the address balance status.
     */
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            // Default implementation using provider. Can be overriden.
            address = address ? address : yield this.getDefaultAddress();
            return this.connectedProvider.getBalance(address);
        });
    }
    // Inspection
    /**
     * Check if an object is a `Signer`
     * @param value The target object
     * @returns Returns `true` if and only if `object` is a Provider.
     */
    static isSigner(value) {
        return !!(value && value._isSigner);
    }
    /**
     * Align provider's network after the signer is authenticated
     */
    alignProviderNetwork() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const isAuthenticated = yield this.isAuthenticated();
            if (isAuthenticated) {
                yield ((_a = this.provider) === null || _a === void 0 ? void 0 : _a.connect());
                const network = yield this.getNetwork();
                this.connectedProvider.updateNetwork(network);
            }
        });
    }
}
exports.Signer = Signer;
//# sourceMappingURL=abstract-signer.js.map