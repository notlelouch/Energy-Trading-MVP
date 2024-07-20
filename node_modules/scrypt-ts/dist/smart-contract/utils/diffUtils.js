"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeNexts = exports.diffOutputs = exports.getExpectedOutputs = exports.getTransationOutputs = void 0;
const fast_diff_1 = __importDefault(require("fast-diff"));
const scryptlib_1 = require("scryptlib");
const scryptlib_2 = require("scryptlib");
const chalk_1 = __importDefault(require("chalk"));
var Color;
(function (Color) {
    Color["black"] = "\u001B[30m";
    Color["red"] = "\u001B[31m";
    Color["green"] = "\u001B[32m";
    Color["reset"] = "\u001B[0m";
})(Color || (Color = {}));
class WebChalk {
    red(a) {
        return Color.red + a + Color.reset;
    }
    grey(a) {
        return Color.black + a + Color.reset;
    }
    green(a) {
        return Color.green + a + Color.reset;
    }
}
const customChalk = typeof window === 'undefined' ? chalk_1.default : new WebChalk();
//If the lengths differ by more than 50%, the two are considered as significantly different
function isTooDifferent(str1, str2) {
    let maxLen = Math.max(str1.length, str2.length);
    let diffLen = Math.abs(str1.length - str2.length);
    let startswith = str2.startsWith(str1) || str1.startsWith(str2);
    return diffLen / maxLen > 0.5 && maxLen > 3000 && !startswith;
}
//If the lengths differ by more than 50%, the two are considered as significantly different
function toASMAndCut(hex1, hex2) {
    let tooDifferent = isTooDifferent(hex1, hex2);
    let asm1 = scryptlib_1.bsv.Script.fromHex(hex1).toASM();
    let asm2 = scryptlib_1.bsv.Script.fromHex(hex2).toASM();
    if (tooDifferent) {
        let arr1 = asm1.split(' ');
        let arr2 = asm2.split(' ');
        let minLen = Math.min(arr1.length, arr2.length);
        let maxLen = Math.min(minLen, 1000);
        asm1 = arr1.slice(0, maxLen).join(' ');
        if (arr1.length > maxLen) {
            asm1 += ' ...';
        }
        asm2 = arr2.slice(0, maxLen).join(' ');
        if (arr2.length > maxLen) {
            asm2 += ' ...';
        }
    }
    return [asm1, asm2];
}
function stringify(state) {
    return JSON.stringify(state, (key, value) => {
        if (typeof value === 'bigint') {
            return value.toString();
        }
        return value;
    }, 4);
}
function formatOutputs(contract, expectedOutputs, transactionOutputs) {
    if (scryptlib_2.AbstractContract.isStateful(contract)) {
        const codePart = contract.codePart.toHex();
        const indexs1 = transactionOutputs.map((o, index) => o.script.startsWith(codePart) ? index : -1).filter(i => i > -1);
        const indexs2 = expectedOutputs.map((o, index) => o.script.startsWith(codePart) ? index : -1).filter(i => i > -1);
        const commonIndexs = indexs1.map((indexc, index) => indexc === indexs2[index] ? indexc : -1).filter(i => i > -1);
        let formater = (output, index) => {
            var _a;
            if (commonIndexs.includes(index)) {
                const CLS = contract.ContractClass;
                const nopScript = (_a = contract.getPrependNOPScript()) === null || _a === void 0 ? void 0 : _a.toHex();
                const statesProps = nopScript && output.script.startsWith(nopScript) ?
                    CLS.fromHex(output.script.slice(nopScript.length)).statePropsArgs :
                    CLS.fromHex(output.script).statePropsArgs;
                let states = statesProps.reduce((a, v) => {
                    return Object.assign(Object.assign({}, a), { [v.name]: v.value });
                }, {});
                return {
                    script: output.script,
                    satoshis: output.satoshis,
                    states: states
                };
            }
            else {
                return {
                    script: output.script,
                    satoshis: output.satoshis
                };
            }
        };
        return [expectedOutputs.map(formater), transactionOutputs.map(formater)];
    }
    return [expectedOutputs, transactionOutputs];
}
function diffState(expectedOutputs, transactionOutputs) {
    let state = '';
    let index = 0;
    state += customChalk.grey("[");
    expectedOutputs.forEach(output => {
        if (typeof output.states !== 'undefined') {
            if (index > 0) {
                state += customChalk.grey(", ");
            }
            if (typeof transactionOutputs[index] === 'undefined') {
                state += customChalk.red(stringify(output.states));
            }
            else {
                (0, fast_diff_1.default)(stringify(transactionOutputs[index].states), stringify(output.states)).forEach((part) => {
                    if (part[0] === fast_diff_1.default.INSERT) {
                        state += customChalk.red(part[1]);
                    }
                    else if (part[0] === fast_diff_1.default.DELETE) {
                        state += customChalk.green(part[1]);
                    }
                    else {
                        state += customChalk.grey(part[1]);
                    }
                });
            }
        }
        index++;
    });
    for (; index < transactionOutputs.length; index++) {
        const output = transactionOutputs[index];
        if (typeof output.states !== 'undefined') {
            state += customChalk.green(stringify(output.states));
        }
    }
    state += customChalk.grey("]");
    return state;
}
function foldStr(str) {
    let arr = str.split(' ');
    if (arr.length > 10) {
        return arr.slice(0, 5).concat(['...']).concat(arr.slice(arr.length - 5)).join(' ');
    }
    else {
        return str;
    }
}
/** @ignore */
function getTransationOutputs(tx, inputIndex, sigHashType) {
    if ((sigHashType & 0x1f) != scryptlib_1.bsv.crypto.Signature.SIGHASH_SINGLE && (sigHashType & 0x1f) != scryptlib_1.bsv.crypto.Signature.SIGHASH_NONE) {
        return tx.outputs.map(output => ({
            script: output.script.toHex(),
            satoshis: output.satoshis
        }));
    }
    if ((sigHashType & 0x1f) == scryptlib_1.bsv.crypto.Signature.SIGHASH_SINGLE && inputIndex < tx.outputs.length) {
        return tx.outputs.filter((_, idx) => {
            return idx === inputIndex;
        }).map(output => ({
            script: output.script.toHex(),
            satoshis: output.satoshis
        }));
    }
    return [];
}
exports.getTransationOutputs = getTransationOutputs;
/** @ignore */
function getExpectedOutputs(hex) {
    const reader = new scryptlib_1.bsv.encoding.BufferReader(Buffer.from(hex, 'hex'));
    const outputs = [];
    try {
        while (!reader.eof()) {
            const output = scryptlib_1.bsv.Transaction.Output.fromBufferReader(reader);
            outputs.push(output);
        }
    }
    catch (error) {
        throw new Error("Invalid argument: `outputs`");
    }
    return outputs.map(output => ({
        script: output.script.toHex(),
        satoshis: output.satoshis
    }));
}
exports.getExpectedOutputs = getExpectedOutputs;
/**
 *
 * Compare the expected outputs of the contract with the actual outputs of the transaction
 * @ignore
 * @param contract
 * @param expectedOutputs
 * @param transactionOutputs
 * @returns json string with diff information
 */
function diffOutputs(contract, expectedOutputs, transactionOutputs) {
    let result = `1. Outputs in the ${customChalk.green('Transaction')} is marked green.
2. Outputs expected by the \`${customChalk.red(contract.contractName)}\` contract is marked red.
3. Identical parts are marked in gray.\n\n`;
    let [contractOutputs_, txContextOutputs_] = formatOutputs(contract, expectedOutputs, transactionOutputs);
    let outputs = '';
    let index = 0;
    outputs += customChalk.grey("[");
    contractOutputs_.forEach(output => {
        if (index > 0) {
            outputs += customChalk.grey(", ");
        }
        if (typeof txContextOutputs_[index] === 'undefined') {
            outputs += customChalk.red("{\n");
            outputs += customChalk.red("    satoshi:" + output.satoshis);
            outputs += customChalk.red(",\n");
            outputs += customChalk.red("    script:");
            outputs += customChalk.red(foldStr(scryptlib_1.bsv.Script.fromHex(output.script).toASM()));
            outputs += customChalk.red("\n");
            outputs += customChalk.red("}");
        }
        else {
            outputs += customChalk.grey("{\n");
            outputs += customChalk.grey("    satoshi:");
            if (output.satoshis === txContextOutputs_[index].satoshis) {
                outputs += customChalk.grey(output.satoshis + '');
            }
            else {
                outputs += customChalk.red(output.satoshis + '');
                outputs += customChalk.green(txContextOutputs_[index].satoshis + '');
            }
            outputs += customChalk.grey(",\n");
            outputs += customChalk.grey("    script:");
            if (output.script === txContextOutputs_[index].script) {
                outputs += customChalk.grey(foldStr(scryptlib_1.bsv.Script.fromHex(output.script).toASM()));
            }
            else {
                const [asm1, asm2] = toASMAndCut(txContextOutputs_[index].script, output.script);
                (0, fast_diff_1.default)(asm1, asm2).forEach((part) => {
                    if (part[0] === fast_diff_1.default.INSERT) {
                        outputs += customChalk.red(foldStr(part[1]));
                    }
                    else if (part[0] === fast_diff_1.default.DELETE) {
                        outputs += customChalk.green(foldStr(part[1]));
                    }
                    else {
                        outputs += customChalk.grey(foldStr(part[1]));
                    }
                });
            }
            outputs += customChalk.grey("\n}");
        }
        index++;
    });
    for (; index < txContextOutputs_.length; index++) {
        const output = txContextOutputs_[index];
        outputs += customChalk.grey(",");
        outputs += customChalk.green("{\n");
        outputs += customChalk.green("    satoshi:" + output.satoshis);
        outputs += customChalk.green(",\n");
        outputs += customChalk.green("    script:");
        outputs += customChalk.green(foldStr(scryptlib_1.bsv.Script.fromHex(output.script).toASM()));
        outputs += customChalk.green("\n");
        outputs += customChalk.green("}");
    }
    outputs += customChalk.grey("]");
    result = result + `Outputs: ${outputs}`;
    if (scryptlib_2.AbstractContract.isStateful(contract)) {
        result = result + `\n\nStates: ${diffState(contractOutputs_, txContextOutputs_)}`;
    }
    return result;
}
exports.diffOutputs = diffOutputs;
/** @ignore */
function mergeNexts(calllogs) {
    const outputsInstance = new Map();
    calllogs.forEach(log => {
        (log.nexts || []).forEach(n => {
            if (!outputsInstance.has(n.atOutputIndex)) {
                outputsInstance.set(n.atOutputIndex, n);
            }
            else {
                const n_ = outputsInstance.get(n.atOutputIndex);
                if (n_.instance !== n.instance) {
                    throw new Error(`The ${n.atOutputIndex}-th output of the transaction is repeatedly bound to the contract instance`);
                }
            }
        });
    });
    return Array.from(outputsInstance.values()).sort((a, b) => a.atOutputIndex - b.atOutputIndex);
}
exports.mergeNexts = mergeNexts;
//# sourceMappingURL=diffUtils.js.map