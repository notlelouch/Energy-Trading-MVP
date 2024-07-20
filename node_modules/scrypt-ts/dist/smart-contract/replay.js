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
exports.replayToLatest = void 0;
const bsv_1 = require("./bsv");
const superagent_1 = __importDefault(require("superagent"));
function scriptCodeHash(script) {
    const asm = script.toASM();
    const index = asm.lastIndexOf('OP_RETURN');
    const codePart = index === -1
        ? script
        : bsv_1.bsv.Script.fromASM(asm.substring(0, index).trim());
    return bsv_1.bsv.crypto.Hash.sha256(codePart.toBuffer()).toString('hex');
}
function getCodeHash(provider, outpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = yield provider.getTransaction(outpoint.txId);
        return scriptCodeHash(tx.outputs[outpoint.outputIndex].script);
    });
}
function getSpentIn(provider, outpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const network = provider.getNetwork() === bsv_1.bsv.Networks.mainnet ? 'main' : 'test';
        const url = `https://api.whatsonchain.com/v1/bsv/${network}/tx/${outpoint.txId}/${outpoint.outputIndex}/spent`;
        return superagent_1.default
            .get(url)
            .then((r) => __awaiter(this, void 0, void 0, function* () {
            return {
                tx: yield provider.getTransaction(r.body.txid),
                atInputIndex: r.body.vin,
            };
        }))
            .catch((e) => {
            if (e.response.status === 404) {
                return undefined;
            }
            throw new Error(e.message);
        });
    });
}
function getSpentChainItem(provider, outpoint, codeHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const spentIn = yield getSpentIn(provider, outpoint);
        if (!spentIn) {
            return undefined;
        }
        const { tx } = spentIn;
        const nextsIndex = tx.outputs
            .filter((output) => scriptCodeHash(output.script) === codeHash)
            .map((_, i) => i);
        if (nextsIndex.length > 1) {
            throw Error('only support linear spent chain');
        }
        return {
            spentIn,
            nextOutputIndex: nextsIndex.length === 1 ? nextsIndex[0] : undefined,
        };
    });
}
function traceSpent(provider, outpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const codeHash = yield getCodeHash(provider, outpoint);
        const chain = [];
        let item = yield getSpentChainItem(provider, outpoint, codeHash);
        while (item && item.nextOutputIndex !== undefined) {
            chain.push(item);
            item = yield getSpentChainItem(provider, {
                txId: item.spentIn.tx.id,
                outputIndex: item.nextOutputIndex,
            }, codeHash);
        }
        return chain;
    });
}
function replay(instance, item) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!instance || item.nextOutputIndex === undefined) {
            return undefined;
        }
        const next = instance.next();
        const { tx, atInputIndex } = item.spentIn;
        const clazz = next.constructor;
        const callData = clazz.parseCallData(tx, atInputIndex);
        const { methodName, args } = callData;
        // TODO Check offchainUpdates prop and method name and throw err accordingly.
        const offchainUpdates = next.getOffchainUpdates();
        if (offchainUpdates) {
            const fn = offchainUpdates[methodName];
            fn === null || fn === void 0 ? void 0 : fn.call(next, next, ...args.map((arg) => arg.value));
        }
        next.from = {
            tx,
            outputIndex: item.nextOutputIndex,
        };
        return next;
    });
}
function replayToLatest(instance, outpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const chain = yield traceSpent(instance.provider, outpoint);
        let next = instance;
        for (const item of chain) {
            next = yield replay(next, item);
        }
        return next;
    });
}
exports.replayToLatest = replayToLatest;
//# sourceMappingURL=replay.js.map