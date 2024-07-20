import { SupportedParamType, AbstractContract } from "scryptlib/dist";
import { ByteString, SortedItemAccessTraceable } from "./types";
/**
 * The HashedSet library provides a set-like data structure.
 * It can be regarded as a special HashedMap where a value is the same with its key and is thus omitted.
 * Unique values are hashed before being stored. Only the hash values of key are saved on the chain.
 * `HashedSet` is a wrapper for `Set` in javascript.
 * Only some of the specified functions can be called in the `@method` function of a contract, but there is no restriction on other places.
 * @category Standard Contracts
 */
export declare class HashedSet<T extends SupportedParamType> extends Set<T> implements SortedItemAccessTraceable {
    /** @ignore */
    private _elemType?;
    /** @ignore */
    private _type?;
    /** @ignore */
    private _DelegateClazz?;
    /** @ignore use a map, which holds `hash(value)` => `value` to implement the HashedSet*/
    private _map;
    /** @ignore */
    private _tracer?;
    /**
     * The constructor of `HashedSet` should not be called inside the contract.
     * The `HashedSet` should be created outside the contract and passed to the contract via the contract's constructor.
     */
    constructor(values?: readonly T[] | null);
    /**
     * Appends a new element with a specified value to the Set.
     * Can be called in the `@method` function of a contract
     * @param value value of a element
     * @returns this set
     */
    add(value: T): this;
    /**
     * Remove a element with a specified value from the Set.
     * Can be called in the `@method` function of a contract
     * @param value value of a element
     * @returns true if an element in the Set existed and has been removed, or false if the element does not exist.
     */
    delete(value: T): boolean;
    /**
     * Check whether element exists in the set
     * Can be called in the `@method` function of a contract
     * @param value value of a element
     * @returns true if an element with the specified value exists in the Set, otherwise returns false.
     */
    has(value: T): boolean;
    /** @ignore */
    attachTo(type: string, clazz: typeof AbstractContract): void;
    /**
     * Returns the internal data representation of the set.
     * Can be called in the `@method` function of a contract
     */
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
