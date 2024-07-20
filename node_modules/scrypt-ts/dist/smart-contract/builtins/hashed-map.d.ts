import { AbstractContract } from "scryptlib/dist";
import { SupportedParamType } from "scryptlib/dist/scryptTypes";
import { ByteString } from "./types";
import { SortedItemAccessTraceable } from "./sorted-item";
/**
 * The `HashedMap` library provides a map/hashtable-like data structure. Unique keys and their corresponding values are hashed before being stored.
 * Only the hash values of key and value are saved on the chain.
 * `HashedMap` is a wrapper for `Map` in javascript.
 * Only some of the specified functions can be called in the `@method` function of a contract, but there is no restriction on other places.
 * @category Standard Contracts
 */
export declare class HashedMap<K extends SupportedParamType, V extends SupportedParamType> extends Map<K, V> implements SortedItemAccessTraceable {
    /** @ignore */
    private _keyType?;
    /** @ignore */
    private _valueType?;
    /** @ignore */
    private _type?;
    /** @ignore */
    private _DelegateClazz?;
    /** @ignore */
    private _tracer?;
    /**
     * The constructor of `HashedMap` should not be called inside the contract.
     * The `HashedMap` should be created outside the contract and passed to the contract via the contract's constructor.
     */
    constructor(entries?: readonly (readonly [K, V])[] | null);
    /**
     * Insert or update a (key, val) pair to the HashedMap.
     * If an element with the same key already exists, the element will be updated.
     * Can be called in the `@method` function of a contract
     * @param key key
     * @param value value
     * @returns this
     */
    set(key: K, value: V): this;
    /**
     * Get value of a pair in the map by key
     * Can not be called in the `@method` function of a contract
     * @param key key
     * @returns value if key exists. Otherwise undefined.
     */
    get(key: K): V;
    /**
     * Check whether key exists in the map
     * Can be called in the `@method` function of a contract
     * @returns true if the HashedMap has the specified key in it, otherwise returns false.
     */
    has(key: K): boolean;
    /**
     * Remove a entry with a specified key from the map.
     * Can be called in the `@method` function of a contract
     * @returns true if an element in the HashedMap existed and has been removed, or false if the element does not exist.
     */
    delete(key: K): boolean;
    /** @ignore */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    /** @ignore */
    entries(): IterableIterator<[K, V]>;
    /** @ignore */
    keys(): IterableIterator<K>;
    /** @ignore */
    values(): IterableIterator<V>;
    /** @ignore */
    [Symbol.iterator](): IterableIterator<[K, V]>;
    /**
     * Check whether we can get a (key, val) pair from the map
     * Can be called in the `@method` function of a contract
     * @returns true if the HashedMap has the specified key and value pair in it, otherwise returns false.
     */
    canGet(key: K, val: V): boolean;
    /** @ignore */
    attachTo(type: string, clazz: typeof AbstractContract): void;
    /** @ignore */
    data(): import("scryptlib/dist").Bytes;
    /** @ignore */
    startTracing(): void;
    /** @ignore */
    stopTracing(): void;
    /** @ignore */
    serializedAccessPath(): ByteString;
    /** @ignore */
    private get _isAttached();
    /** @ignore */
    private _checkAttached;
    /** @ignore */
    private _traceAccess;
}
