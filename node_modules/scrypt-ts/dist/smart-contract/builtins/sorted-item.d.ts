import { ByteString } from "./types";
import { AbstractContract, SupportedParamType } from "scryptlib/dist";
/**
 * @ignore
 */
export type SortedItem<T> = {
    idx: bigint;
    item: T;
};
/**
 * @ignore
 */
export declare class SortedItemAccess {
    item: any;
    itemHashHex: string;
    idx: bigint;
    static readonly ITEM_HASH_SIZE_IN_BYTES = 32;
    constructor(item: any, itemHash: string, idx: bigint);
    serialize(): ByteString;
}
/**
 * @ignore
 */
export type SortedItemAccessPath = SortedItemAccess[];
/**
 * @ignore
 */
export interface SortedItemAccessTraceable {
    startTracing(): void;
    stopTracing(): void;
    serializedAccessPath(): ByteString;
}
/**
 * @ignore
 */
export declare function instanceOfSIATraceable(obj: any): obj is SortedItemAccessTraceable;
/**
 * @ignore
 */
export declare class SortedItemAccessTracer<T extends SupportedParamType> implements SortedItemAccessTraceable {
    private _traceEnabled;
    private _accessPath;
    private _hasher;
    private _sequencer;
    constructor(type: string, clazz: typeof AbstractContract);
    traceAccess(item: T, items: T[] | IterableIterator<T>): void;
    startTracing(): void;
    stopTracing(): void;
    serializedAccessPath(): ByteString;
}
