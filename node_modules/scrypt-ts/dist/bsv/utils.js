"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUTXO = exports.parseSignatureOption = exports.parseAddresses = exports.utxoFromOutput = exports.getRandomAddress = exports.getDummyP2pkhUTXOs = void 0;
const scryptlib_1 = require("scryptlib");
const crypto_1 = require("crypto");
function getDummyP2pkhUTXOs(count = 1) {
    return new Array(count).fill(0).map(_ => {
        return {
            txId: (0, crypto_1.randomBytes)(32).toString('hex'),
            outputIndex: 0,
            script: scryptlib_1.bsv.Script.buildPublicKeyHashOut(getRandomAddress()).toHex(),
            satoshis: 1
        };
    });
}
exports.getDummyP2pkhUTXOs = getDummyP2pkhUTXOs;
function getRandomAddress(network = scryptlib_1.bsv.Networks.testnet) {
    return scryptlib_1.bsv.Address.fromPrivateKey(scryptlib_1.bsv.PrivateKey.fromRandom(network.name), network);
}
exports.getRandomAddress = getRandomAddress;
function utxoFromOutput(tx, outputIndex) {
    const output = tx.outputs[outputIndex];
    if (!output) {
        throw new Error(`outputIndex ${outputIndex} does not exist on tx ${tx.id}`);
    }
    return {
        txId: tx.id,
        outputIndex,
        script: output.script.toHex(),
        satoshis: output.satoshis
    };
}
exports.utxoFromOutput = utxoFromOutput;
function parseAddresses(publicKeysOrAddresses, network) {
    return Array.from([publicKeysOrAddresses]).flat().map(pkOrAddr => pkOrAddr instanceof scryptlib_1.bsv.Address ? pkOrAddr : pkOrAddr.toAddress(network));
}
exports.parseAddresses = parseAddresses;
function parseSignatureOption(signaturesOption, network) {
    return Array.from([signaturesOption]).flat().map(signatureOption => {
        if (signatureOption instanceof scryptlib_1.bsv.Address) {
            return {
                address: signatureOption,
                sigHashType: scryptlib_1.DEFAULT_SIGHASH_TYPE,
            };
        }
        if (signatureOption instanceof scryptlib_1.bsv.PublicKey) {
            return {
                address: signatureOption.toAddress(network),
                sigHashType: scryptlib_1.DEFAULT_SIGHASH_TYPE,
            };
        }
        return parseAddresses(signatureOption.pubKeyOrAddr, network).map(address => {
            return {
                address,
                sigHashType: signatureOption.sigHashType || scryptlib_1.DEFAULT_SIGHASH_TYPE,
                csIdx: signatureOption.csIdx,
                data: signatureOption.data,
            };
        });
    }).flat();
}
exports.parseSignatureOption = parseSignatureOption;
function filterUTXO(utxos, options) {
    const unspentValue = options.unspentValue;
    const estimateSize = options.estimateSize;
    const feePerKb = options.feePerKb;
    const additional = options.additional || 0;
    // n stands for n utxo, and provder provides
    // providerAmount represents the total amount of utxo provided by provider
    // feePerKb <=  unspentValue / estimateSize * 1000
    // feePerKb <= (unspentValue + providerAmount) / ((estimateSize + (180 * n)) * 1000
    function pickUtxos(utxos) {
        let providerAmount = 0;
        let index = -1;
        for (let i = 0; i < utxos.length; i++) {
            let n = i + 1;
            providerAmount += utxos[i].satoshis;
            // If `hasPrevouts=true`, you need to consider that increasing the number of inputs will cause the unlock parameter `__scrypt_ts_prevouts` to increase
            if (feePerKb <= (unspentValue + providerAmount) / (estimateSize + ((180 + (additional)) * n)) * 1000) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            return utxos.slice(0, index + 1);
        }
        return [];
    }
    const sortedUtxos = utxos.sort((a, b) => a.satoshis - b.satoshis);
    let results = pickUtxos(sortedUtxos);
    if (results.length === 0) {
        results = pickUtxos(sortedUtxos.reverse());
        if (results.length === 0) {
            throw new Error(`no sufficient utxos`);
        }
    }
    return results;
}
exports.filterUTXO = filterUTXO;
//# sourceMappingURL=utils.js.map