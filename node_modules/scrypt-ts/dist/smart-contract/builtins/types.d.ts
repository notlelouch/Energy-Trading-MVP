import { Flavor } from "scryptlib";
import { PubKey as _PubKey, Sig as _Sig, SigHashPreimage as _SigHashPreimage, PrivKey as _PrivKey, Ripemd160 as _Ripemd160, PubKeyHash as _PubKeyHash, Sha256 as _Sha256, Sha1 as _Sha1, OpCodeType as _OpCodeType, SigHashType as _SigHashType } from "scryptlib";
export { SubBytes } from "scryptlib";
export { SortedItem, SortedItemAccessTraceable, instanceOfSIATraceable } from './sorted-item';
export { HashedMap } from './hashed-map';
export { HashedSet } from './hashed-set';
/**
 * 'scryptlib' RE-EXPORTS:
 *
 * Functions with underscore prefixes (e.g., _PubKey) are from 'scryptlib'.
 * `PubKey`, `Sig`, `Ripemd160`, `PubKeyHash`, `Sha1`, `Sha256`: Custom wrappers around original functions, to make the param "ByteString".
 * All others: Direct re-exports from 'scryptlib'.
 */
export { _SigHashPreimage as SigHashPreimage };
export { _PrivKey as PrivKey };
export { _OpCodeType as OpCodeType };
export { _SigHashType as SigHashType };
/**
 * A domain specific subtype of `ByteString`, representing a public key.
 */
export type PubKey = _PubKey;
/**
 * A domain specific subtype of `ByteString`, representing a signature.
 */
export type Sig = _Sig;
/**
 * A domain specific subtype of `ByteString`, representing a RIPEMD-160 hash.
 */
export type Ripemd160 = _Ripemd160;
/**
 * A domain specific subtype of `ByteString`, representing an address.
 */
export type PubKeyHash = _PubKeyHash;
/**
 * A domain specific subtype of `ByteString`, representing an address.
 */
export type Addr = _PubKeyHash;
/**
 * A domain specific subtype of `ByteString`, representing a SHA-256 hash.
 */
export type Sha256 = _Sha256;
/**
 * A domain specific subtype of `ByteString`, representing a SHA-1 hash.
 */
export type Sha1 = _Sha1;
/**
 * Creates a `PubKey` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific public key representation.
 */
export declare function PubKey(b: ByteString): PubKey;
/**
 * Creates a `Sig` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific digital signature representation.
 */
export declare function Sig(b: ByteString): Sig;
/**
 * Creates a `Ripemd160` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific RIPEMD-160 hash representation.
 */
export declare function Ripemd160(b: ByteString): Ripemd160;
/**
 * Creates a `PubKeyHash` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific address representation.
 */
export declare function PubKeyHash(b: ByteString): PubKeyHash;
/**
 * Creates an `Addr` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific address representation.
 */
export declare function Addr(b: ByteString): Addr;
/**
 * Creates a `Sha1` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific SHA-1 hash representation.
 */
export declare function Sha1(b: ByteString): Sha1;
/**
 * Creates a `Sha256` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific SHA-256 hash representation.
 */
export declare function Sha256(b: ByteString): Sha256;
/** a ByteString represents a byte array. */
export type ByteString = Flavor<string, 'bytes'>;
/**
 * Converts a literal to ByteString.
 * If not passing `isUtf8` or `isUtf8` is false, then `literal` should be in the format of hex literal, i.e. `/^([0-9a-fA-F]{2})*$/`
 * Otherwise, `literal` should be in the format of utf8 literal, i.e. `hello world`
 * @param {string} literal literal string, can be hex literal or utf8 literal, depends on the `isUtf8` marker
 * @param {boolean} isUtf8 marker indicating whether `literal` is utf8 or hex
 */
export declare function toByteString(literal: string, isUtf8?: boolean): ByteString;
/**
 * The auto keyword specifies that the type of the variable, of basic type, declared will be automatically deducted from its initializer.
 * @category Types
 */
export type auto = any;
/**
 * An array is a fixed-size list of values of the same basic type.
 * When you declare an array you have to declare it like this:
 * @example
 *  ```ts
 * let aaa: FixedArray<bigint, 3> = [1n, 3n, 3n];
 *
 * let abb: FixedArray<FixedArray<bigint, 2>, 3> = [[1n, 3n], [1n, 3n], [1n, 3n]];
 *
 * let bbb: FixedArray<FixedArray<FixedArray<bigint, 1>, 2>, 3> = [[[1n], [1n]], [[1n], [1n]], [[1n], [1n]]];
 * ```
 * @category Array
 */
export type FixedArray<T, N extends number> = Array<T> & {
    length: N;
};
/**
 * Comparing two struct/FixedArray
 * @returns {boolean} returns true if equal; otherwise returns false
 * @category Global Function
 */
export declare function equals<T>(a: T, b: T): boolean;
