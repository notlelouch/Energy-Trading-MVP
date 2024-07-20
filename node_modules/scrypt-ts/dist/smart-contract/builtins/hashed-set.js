"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashedSet = void 0;
const dist_1 = require("scryptlib/dist");
const sorted_item_1 = require("./sorted-item");
const object_hash_1 = __importDefault(require("object-hash"));
/**
 * The HashedSet library provides a set-like data structure.
 * It can be regarded as a special HashedMap where a value is the same with its key and is thus omitted.
 * Unique values are hashed before being stored. Only the hash values of key are saved on the chain.
 * `HashedSet` is a wrapper for `Set` in javascript.
 * Only some of the specified functions can be called in the `@method` function of a contract, but there is no restriction on other places.
 * @category Standard Contracts
 */
class HashedSet extends Set {
    /**
     * The constructor of `HashedSet` should not be called inside the contract.
     * The `HashedSet` should be created outside the contract and passed to the contract via the contract's constructor.
     */
    constructor(values) {
        super(values);
        this._map = new Map();
    }
    /**
     * Appends a new element with a specified value to the Set.
     * Can be called in the `@method` function of a contract
     * @param value value of a element
     * @returns this set
     */
    add(value) {
        // use the hash of the value to be its unique identifier.
        const valHash = (0, object_hash_1.default)(value);
        this._map = this._map || new Map();
        if (!this._map.has(valHash)) {
            // add value to this only if it has not been inserted yet.
            Set.prototype.add.call(this, value);
            this._map.set(valHash, value);
        }
        this._traceAccess(value);
        return this;
    }
    /**
     * Remove a element with a specified value from the Set.
     * Can be called in the `@method` function of a contract
     * @param value value of a element
     * @returns true if an element in the Set existed and has been removed, or false if the element does not exist.
     */
    delete(value) {
        this._traceAccess(value);
        const valHash = (0, object_hash_1.default)(value);
        const valueRef = this._map.get(valHash);
        this._map.delete(valHash);
        return Set.prototype.delete.call(this, valueRef);
    }
    /**
     * Check whether element exists in the set
     * Can be called in the `@method` function of a contract
     * @param value value of a element
     * @returns true if an element with the specified value exists in the Set, otherwise returns false.
     */
    has(value) {
        this._traceAccess(value);
        const valHash = (0, object_hash_1.default)(value);
        const valueRef = this._map.get(valHash);
        return Set.prototype.has.call(this, valueRef);
    }
    /** @ignore */
    attachTo(type, clazz) {
        const [_, genericTypes] = (0, dist_1.parseGenericType)(type);
        this._elemType = genericTypes[0];
        this._DelegateClazz = clazz;
        this._type = type;
        this._tracer = new sorted_item_1.SortedItemAccessTracer(this._elemType, clazz);
    }
    /**
     * Returns the internal data representation of the set.
     * Can be called in the `@method` function of a contract
     */
    data() {
        this._checkAttached();
        return this._DelegateClazz.toData(this, this._type);
    }
    /** @ignore */
    startTracing() {
        var _a;
        (_a = this._tracer) === null || _a === void 0 ? void 0 : _a.startTracing();
    }
    /** @ignore */
    stopTracing() {
        var _a;
        (_a = this._tracer) === null || _a === void 0 ? void 0 : _a.stopTracing();
    }
    /** @ignore */
    serializedAccessPath() {
        var _a;
        return (_a = this._tracer) === null || _a === void 0 ? void 0 : _a.serializedAccessPath();
    }
    /** @ignore */
    get _isAttached() {
        return this._DelegateClazz !== undefined
            && this._type !== undefined
            && this._elemType !== undefined;
    }
    /** @ignore */
    _checkAttached() {
        if (!this._isAttached) {
            throw new Error(`\`this.attachTo\` should be called before`);
        }
    }
    /** @ignore */
    _traceAccess(value) {
        var _a;
        (_a = this._tracer) === null || _a === void 0 ? void 0 : _a.traceAccess(value, this.values());
    }
}
exports.HashedSet = HashedSet;
//# sourceMappingURL=hashed-set.js.map