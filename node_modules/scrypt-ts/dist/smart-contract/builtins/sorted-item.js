"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedItemAccessTracer = exports.instanceOfSIATraceable = exports.SortedItemAccess = void 0;
const functions_1 = require("./functions");
const dist_1 = require("scryptlib/dist");
/**
 * @ignore
 */
class SortedItemAccess {
    constructor(item, itemHash, idx) {
        this.item = item;
        this.itemHashHex = itemHash;
        this.idx = idx;
    }
    serialize() {
        if (this.itemHashHex.length !== SortedItemAccess.ITEM_HASH_SIZE_IN_BYTES * 2) {
            throw new Error(`invalid hashed key size ${this.itemHashHex.length}, should be ${SortedItemAccess.ITEM_HASH_SIZE_IN_BYTES * 2} in hex`);
        }
        // Note: only serialize idx here, if want to add more fields, sCrypt should implement the deserilization feature first.
        return functions_1.VarIntWriter.writeInt(this.idx);
    }
}
exports.SortedItemAccess = SortedItemAccess;
// hash256'ed item size, 32 bytes
SortedItemAccess.ITEM_HASH_SIZE_IN_BYTES = 32;
/**
 * @ignore
 */
function instanceOfSIATraceable(obj) {
    return obj
        && 'startTracing' in obj
        && 'stopTracing' in obj
        && 'serializedAccessPath' in obj;
}
exports.instanceOfSIATraceable = instanceOfSIATraceable;
class ScryptHasher {
    constructor(type, clazz) {
        this._itemType = type;
        this._DelegateClazz = clazz;
    }
    hash(item) {
        return this._DelegateClazz.flattenSha256(item, this._itemType);
    }
}
class ScryptSequencer {
    constructor(hasher) {
        this.hasher = hasher;
    }
    findIndex(item, items) {
        const itemBN = this._item2BN(item);
        const idx = Array.from(items)
            .map(k => this._item2BN(k))
            .sort((a, b) => a.cmp(b)).findIndex(bn => itemBN.eq(bn));
        return BigInt(idx);
    }
    // use a crypto.BN object to reprsents the item in comparation.
    _item2BN(item) {
        return dist_1.bsv.crypto.BN.fromSM(Buffer.from(this.hasher.hash(item), 'hex'), { endian: 'little' });
    }
}
/**
 * @ignore
 */
class SortedItemAccessTracer {
    constructor(type, clazz) {
        this._traceEnabled = false;
        this._accessPath = [];
        this._hasher = new ScryptHasher(type, clazz);
        this._sequencer = new ScryptSequencer(this._hasher);
    }
    traceAccess(item, items) {
        // only trace access if the tracer is enabled
        if (this._traceEnabled) {
            this._accessPath.push(new SortedItemAccess(item, this._hasher.hash(item), this._sequencer.findIndex(item, items)));
        }
    }
    startTracing() {
        this._traceEnabled = true;
        this._accessPath = [];
    }
    stopTracing() {
        this._traceEnabled = false;
    }
    serializedAccessPath() {
        return (this._accessPath || []).map(log => log.serialize()).join('');
    }
}
exports.SortedItemAccessTracer = SortedItemAccessTracer;
//# sourceMappingURL=sorted-item.js.map