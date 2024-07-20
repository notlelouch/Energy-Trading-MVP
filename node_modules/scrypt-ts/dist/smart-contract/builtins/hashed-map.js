"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashedMap = void 0;
const dist_1 = require("scryptlib/dist");
const object_hash_1 = __importDefault(require("object-hash"));
const sorted_item_1 = require("./sorted-item");
const utils_1 = require("../utils");
/**
 * The `HashedMap` library provides a map/hashtable-like data structure. Unique keys and their corresponding values are hashed before being stored.
 * Only the hash values of key and value are saved on the chain.
 * `HashedMap` is a wrapper for `Map` in javascript.
 * Only some of the specified functions can be called in the `@method` function of a contract, but there is no restriction on other places.
 * @category Standard Contracts
 */
class HashedMap extends Map {
    /**
     * The constructor of `HashedMap` should not be called inside the contract.
     * The `HashedMap` should be created outside the contract and passed to the contract via the contract's constructor.
     */
    constructor(entries) {
        super(entries);
    }
    /**
     * Insert or update a (key, val) pair to the HashedMap.
     * If an element with the same key already exists, the element will be updated.
     * Can be called in the `@method` function of a contract
     * @param key key
     * @param value value
     * @returns this
     */
    set(key, value) {
        // use `InternalValue` as the internal value stored in this map
        const internalVal = { originalKey: key, value };
        // use hash(key) as inside key to support Object-typed keys
        Map.prototype.set.call(this, (0, object_hash_1.default)(key), internalVal);
        // calculate key index should be after its insertion
        this._traceAccess(key);
        return this;
    }
    /**
     * Get value of a pair in the map by key
     * Can not be called in the `@method` function of a contract
     * @param key key
     * @returns value if key exists. Otherwise undefined.
     */
    get(key) {
        const internalVal = Map.prototype.get.call(this, (0, object_hash_1.default)(key));
        return internalVal === null || internalVal === void 0 ? void 0 : internalVal.value;
    }
    /**
     * Check whether key exists in the map
     * Can be called in the `@method` function of a contract
     * @returns true if the HashedMap has the specified key in it, otherwise returns false.
     */
    has(key) {
        this._traceAccess(key);
        return Map.prototype.has.call(this, (0, object_hash_1.default)(key));
    }
    /**
     * Remove a entry with a specified key from the map.
     * Can be called in the `@method` function of a contract
     * @returns true if an element in the HashedMap existed and has been removed, or false if the element does not exist.
     */
    delete(key) {
        this._traceAccess(key);
        return Map.prototype.delete.call(this, (0, object_hash_1.default)(key));
    }
    /** @ignore */
    forEach(callbackfn, thisArg) {
        Map.prototype.forEach.call(this, (value, key, map) => {
            const internalVal = value;
            callbackfn(internalVal.value, internalVal.originalKey, map);
        }, thisArg);
    }
    /** @ignore */
    entries() {
        return (0, utils_1.mapIter)(Map.prototype.entries.call(this), ([_, internalVal]) => {
            return [internalVal.originalKey, internalVal.value];
        });
    }
    /** @ignore */
    keys() {
        const self = this;
        return (0, utils_1.mapIter)(Map.prototype.keys.call(this), (hashedKey) => {
            const internalVal = Map.prototype.get.call(self, hashedKey);
            return internalVal.originalKey;
        });
    }
    /** @ignore */
    values() {
        return (0, utils_1.mapIter)(Map.prototype.values.call(this), (internalVal) => {
            return internalVal.value;
        });
    }
    /** @ignore */
    [Symbol.iterator]() {
        return this.entries();
    }
    /**
     * Check whether we can get a (key, val) pair from the map
     * Can be called in the `@method` function of a contract
     * @returns true if the HashedMap has the specified key and value pair in it, otherwise returns false.
     */
    canGet(key, val) {
        this._traceAccess(key);
        const value = this.get(key);
        if (typeof value !== 'undefined') {
            return (0, object_hash_1.default)(value) === (0, object_hash_1.default)(val);
        }
        return false;
    }
    /** @ignore */
    attachTo(type, clazz) {
        const [_, genericTypes] = (0, dist_1.parseGenericType)(type);
        this._keyType = genericTypes[0];
        this._valueType = genericTypes[1];
        this._DelegateClazz = clazz;
        this._type = type;
        this._tracer = new sorted_item_1.SortedItemAccessTracer(this._keyType, clazz);
    }
    /** @ignore */
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
            && this._keyType !== undefined
            && this._valueType !== undefined;
    }
    /** @ignore */
    _checkAttached() {
        if (!this._isAttached) {
            throw new Error(`\`this.attachTo\` should be called before`);
        }
    }
    /** @ignore */
    _traceAccess(key) {
        var _a;
        (_a = this._tracer) === null || _a === void 0 ? void 0 : _a.traceAccess(key, this.keys());
    }
}
exports.HashedMap = HashedMap;
//# sourceMappingURL=hashed-map.js.map