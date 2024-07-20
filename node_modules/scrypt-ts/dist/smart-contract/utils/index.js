"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTxFee = exports.fromByteString = exports.camelCaseCapitalized = exports.alterFileExt = exports.isInNodeEnv = exports.mapIter = exports.findSigs = exports.findSig = exports.toNumber = exports.getDummySig = void 0;
const path_1 = __importDefault(require("path"));
const scryptlib_1 = require("scryptlib");
const types_1 = require("../builtins/types");
function getDummySig() {
    return new Array(72 * 2).fill(0).join('');
}
exports.getDummySig = getDummySig;
function toNumber(sighashType) {
    return parseInt('0x' + sighashType);
}
exports.toNumber = toNumber;
function findSig(sigResponses, pubKeyOrAddr, sigHashType = scryptlib_1.DEFAULT_SIGHASH_TYPE) {
    return findSigs(sigResponses, [{
            pubKeyOrAddr: pubKeyOrAddr,
            sigHashType
        }])[0];
}
exports.findSig = findSig;
function findSigs(sigResponses, queries) {
    return queries.map(query => {
        let publicKeysOrAddresses;
        let sigHashType;
        if (query instanceof scryptlib_1.bsv.Address || query instanceof scryptlib_1.bsv.PublicKey) {
            publicKeysOrAddresses = query;
            sigHashType = scryptlib_1.DEFAULT_SIGHASH_TYPE;
        }
        else {
            publicKeysOrAddresses = query.pubKeyOrAddr;
            sigHashType = query.sigHashType || scryptlib_1.DEFAULT_SIGHASH_TYPE;
        }
        return Array.from([publicKeysOrAddresses]).flat().map(pubKeyOrAddr => {
            const sigResp = sigResponses.find((sigResp) => {
                return (sigResp.publicKey === pubKeyOrAddr.toString() ||
                    scryptlib_1.bsv.PublicKey.fromString(sigResp.publicKey).toAddress(scryptlib_1.bsv.Networks.testnet).toString() === pubKeyOrAddr.toString() ||
                    scryptlib_1.bsv.PublicKey.fromString(sigResp.publicKey).toAddress(scryptlib_1.bsv.Networks.livenet).toString() === pubKeyOrAddr.toString()) && sigResp.sigHashType === sigHashType;
            });
            if (!sigResp) {
                const text = pubKeyOrAddr instanceof scryptlib_1.bsv.Address ? 'address' : 'public key';
                throw new Error(`cannot find signature for ${text} \`${pubKeyOrAddr.toString()}\` in sigResponses`);
            }
            return (0, types_1.Sig)(sigResp.sig);
        });
    }).flat();
}
exports.findSigs = findSigs;
function* mapIter(iterable, callback) {
    for (let x of iterable) {
        yield callback(x);
    }
}
exports.mapIter = mapIter;
function isInNodeEnv() {
    return typeof process != 'undefined';
}
exports.isInNodeEnv = isInNodeEnv;
function alterFileExt(filename, toExt, fromExt) {
    const originalExt = fromExt || path_1.default.extname(filename);
    const extReg = new RegExp(`${originalExt}$`);
    return filename.replace(extReg, '.' + toExt);
}
exports.alterFileExt = alterFileExt;
function camelCaseCapitalized(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
}
exports.camelCaseCapitalized = camelCaseCapitalized;
/**
   * convert ByteString to utf8 string
   * @param bs ByteString
   * @returns utf8 string
   */
function fromByteString(bs) {
    const encoder = new TextDecoder();
    return encoder.decode(Buffer.from(bs, 'hex'));
}
exports.fromByteString = fromByteString;
function checkTxFee(tx, feePerKb) {
    const realFee = tx.getUnspentValue();
    const estimateSize = tx.getEstimateSize();
    const expectedFee = Math.max(1, Math.ceil(estimateSize / 1000 * feePerKb));
    return realFee >= expectedFee;
}
exports.checkTxFee = checkTxFee;
//# sourceMappingURL=index.js.map