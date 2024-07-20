import { SigHashType, Ripemd160, Sha256, Sha1 } from "scryptlib";
import { PubKey, Sig, PubKeyHash, OpCodeType, SigHashPreimage, PrivKey, ByteString, FixedArray, Addr } from "./types";
export { and, xor, or, invert, getSortedItem } from "scryptlib";
/**
 * Returns a section of a ByteString.
 * @param byteString The ByteString.
 * @param start The beginning byte index of the specified portion of ByteString, included.
 * @param end The end byte index of the specified portion of ByteString, excluded.
 *  If this value is not specified, the sub-section continues to the end of ByteString.
 */
export declare function slice(byteString: ByteString, start: BigInt, end?: BigInt): ByteString;
/**
 * Returns an `FixedArray` with all `size` elements set to `value`, where `value` can be any type.
 * Note that `length` must be a numeric literal or a compiled-time constant
 * @param value - the value of each element to set
 * @param length - the length of FixedArray
 */
export declare function fill<E, N extends number>(value: E, length: N): FixedArray<E, N>;
/**
 * bigint can be converted to string with int2ByteString.
 * If `size` is not passed, the number `n` is converted to a ByteString with as few bytes as possible.
 * Otherwise, converts the number `n` to a ByteString of the specified size, including the sign bit. Fails if the number cannot be accommodated.
 * @param n - a number being converts
 * @param size - the size of the ByteString
 * @category Bytes Operations
 */
export declare function int2ByteString(n: bigint, size?: bigint): ByteString;
/**
 * ByteString can be converted to bigint using function byteString2Int.
 * @category Bytes Operations
 */
export declare function byteString2Int(a: ByteString): bigint;
/**
 * Returns the length of the ByteString. Not the length of the string.
 * @category Bytes Operations
 * @param a - a ByteString
 * @returns {bigint} The length of the ByteString.
 */
export declare function len(a: ByteString): bigint;
/**
 * Returns reversed bytes of b, which is of size bytes. Note size must be a compiled-time constant.
 * It is often useful when converting a number between little-endian and big-endian.
 * @category Bytes Operations
 * @param b - a ByteString to be reversed
 * @param size - the size of the ByteString.
 * @returns {ByteString} reversed ByteString.
 */
export declare function reverseByteString(b: ByteString, size: bigint): ByteString;
/**
 * @ignore
 * `exit(bool status)`; statement terminates contract execution.
 * @category exit()
 * @param status - If status is true, contract succeeds; otherwise, it fails.
 *
 */
export declare function exit(status: boolean): void;
/**
 * The input `a` is made positive.
 * @category Math
 */
export declare function abs(a: bigint): bigint;
/**
 * Returns the smallest of `a` and `b`.
 * @category Math
 */
export declare function min(a: bigint, b: bigint): bigint;
/**
 * Returns the largest of `a` and `b`.
 * @category Math
 */
export declare function max(a: bigint, b: bigint): bigint;
/**
 * Returns true if `x` is within the specified range (left-inclusive), false otherwise.
 * @category Math
 */
export declare function within(x: bigint, min: bigint, max: bigint): boolean;
/**
 * A RIPEMD160 hash, which is always 160 bits or 20 bytes long.
 * See:
 * https://en.wikipedia.org/wiki/RIPEMD
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Ripemd160} The hash in the form of a ByteString.
 */
export declare function ripemd160(a: ByteString): Ripemd160;
/**
 * A SHA or SHA1 hash, which is always 160 bits or 20 bytes long.
 *
 * See:
 * https://en.wikipedia.org/wiki/SHA-1
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Sha1} The hash in the form of a string.
 */
export declare function sha1(a: ByteString): Sha1;
/**
 * A SHA256 hash, which is always 256 bits or 32 bytes long.
 *
 * See:
 * https://www.movable-type.co.uk/scripts/sha256.html
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Sha256} The hash in the form of a string.
 */
export declare function sha256(a: ByteString): Sha256;
/**
 * A RIPEMD160 hash of a SHA256 hash, which is always 160 bits or 20 bytes long.
 * This value is commonly used inside Bitcoin, particularly for Bitcoin
 * addresses.
 *
 * See:
 * https://en.wikipedia.org/wiki/RIPEMD
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Ripemd160} The hash in the form of a string.
 */
export declare function hash160(a: ByteString): Ripemd160;
/**
 * A double SHA256 hash, which is always 256 bits or 32 bytes bytes long. This
 * hash function is commonly used inside Bitcoin, particularly for the hash of a
 * block and the hash of a transaction.
 *
 * See:
 * https://www.movable-type.co.uk/scripts/sha256.html
 * @category Hashing
 * @param {ByteString} a ByteString data, a.k.a. pre-image, which can be any size.
 * @returns {Sha256} The hash in the form of a string.
 */
export declare function hash256(a: ByteString): Sha256;
/**
 * Get Addr for PubKey.
 * Under the hood this just wraps the hash160 function.
 * @category Hashing
 * @param {PubKey} the public key.
 * @returns {Addr} address for the passed public key.
 */
export declare function pubKey2Addr(a: PubKey): Addr;
/**
 * `assert(condition: boolean, errorMsg?: string)`
 * Throw an Error with the optional error message if condition is false. Otherwise, nothing happens.
 * @category assert
 */
export declare function assert(condition: boolean, msg?: string): asserts condition;
/**
 * Arithmetic left shift, returns `x * 2^n`.
 * More detail about [Bitwise Operator]{@link https://docs.scrypt.io/how-to-write-a-contract/built-ins#bitwise-operator}
 * @category Bitwise Operator
 */
export declare function lshift(x: bigint, n: bigint): bigint;
/**
 * Arithmetic right shift, returns `x / 2^n`.
 * More detail about [Bitwise Operator]{@link https://docs.scrypt.io/how-to-write-a-contract/built-ins#bitwise-operator}
 * @category Bitwise Operator
 */
export declare function rshift(x: bigint, n: bigint): bigint;
/**
 * @ignore
 */
export declare function asm<ReturnType>(code: any): ReturnType;
/**
 * Opcodes used in [Bitcoin Script]{@link https://wiki.bitcoinsv.io/index.php/Opcodes_used_in_Bitcoin_Script}
 * @category Standard Contracts
 */
export declare class OpCode {
    /**
     * An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
     * @name OP_0
     * @constant {OpCodeType} `OpCodeType('00')`
     */
    static readonly OP_0: OpCodeType;
    /**
     * An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
     * @name OP_FALSE
     * @constant {OpCodeType} `OpCodeType('00')`
     */
    static readonly OP_FALSE: OpCodeType;
    /**
     * The next byte contains the number of bytes to be pushed onto the stack.
     * @name OP_PUSHDATA1
     * @constant {OpCodeType} `OpCodeType('4c')`
     */
    static readonly OP_PUSHDATA1: OpCodeType;
    /**
     * The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.
     * @name OP_PUSHDATA2
     * @constant {OpCodeType} `OpCodeType('4d')`
     */
    static readonly OP_PUSHDATA2: OpCodeType;
    /**
     * The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.
     * @name OP_PUSHDATA4
     * @constant {OpCodeType} `OpCodeType('4e')`
     */
    static readonly OP_PUSHDATA4: OpCodeType;
    /**
     * The number -1 is pushed onto the stack.
     * @name OP_1NEGATE
     * @constant {OpCodeType} `OpCodeType('4f')`
     */
    static readonly OP_1NEGATE: OpCodeType;
    /**
     * Transaction is invalid unless occuring in an unexecuted OP_IF branch
     * @name OP_RESERVED
     * @constant {OpCodeType} `OpCodeType('50')`
     */
    static readonly OP_RESERVED: OpCodeType;
    /**
     * The number 1 is pushed onto the stack.
     * @name OP_1
     * @constant {OpCodeType} `OpCodeType('51')`
     */
    static readonly OP_1: OpCodeType;
    /**
     * The number 1 is pushed onto the stack.
     * @name OP_TRUE
     * @constant {OpCodeType} `OpCodeType('51')`
     */
    static readonly OP_TRUE: OpCodeType;
    /**
     * The number 2 is pushed onto the stack.
     * @name OP_2
     * @constant {OpCodeType} `OpCodeType('52')`
     */
    static readonly OP_2: OpCodeType;
    /**
     * The number 3 is pushed onto the stack.
     * @name OP_3
     * @constant {OpCodeType} `OpCodeType('53')`
     */
    static readonly OP_3: OpCodeType;
    /**
     * The number 4 is pushed onto the stack.
     * @name OP_4
     * @constant {OpCodeType} `OpCodeType('54')`
     */
    static readonly OP_4: OpCodeType;
    /**
     * The number 5 is pushed onto the stack.
     * @name OP_5
     * @constant {OpCodeType} `OpCodeType('55')`
     */
    static readonly OP_5: OpCodeType;
    /**
     * The number 6 is pushed onto the stack.
     * @name OP_6
     * @constant {OpCodeType} `OpCodeType('56')`
     */
    static readonly OP_6: OpCodeType;
    /**
     * The number 7 is pushed onto the stack.
     * @name OP_7
     * @constant {OpCodeType} `OpCodeType('57')`
     */
    static readonly OP_7: OpCodeType;
    /**
     * The number 8 is pushed onto the stack.
     * @name OP_8
     * @constant {OpCodeType} `OpCodeType('58')`
     */
    static readonly OP_8: OpCodeType;
    /**
     * The number 9 is pushed onto the stack.
     * @name OP_9
     * @constant {OpCodeType} `OpCodeType('59')`
     */
    static readonly OP_9: OpCodeType;
    /**
     * The number 10 is pushed onto the stack.
     * @name OP_10
     * @constant {OpCodeType} `OpCodeType('5a')`
     */
    static readonly OP_10: OpCodeType;
    /**
     * The number 11 is pushed onto the stack.
     * @name OP_11
     * @constant {OpCodeType} `OpCodeType('5b')`
     */
    static readonly OP_11: OpCodeType;
    /**
     * The number 12 is pushed onto the stack.
     * @name OP_12
     * @constant {OpCodeType} `OpCodeType('5c')`
     */
    static readonly OP_12: OpCodeType;
    /**
     * The number 13 is pushed onto the stack.
     * @name OP_13
     * @constant {OpCodeType} `OpCodeType('5d')`
     */
    static readonly OP_13: OpCodeType;
    /**
     * The number 14 is pushed onto the stack.
     * @name OP_14
     * @constant {OpCodeType} `OpCodeType('5e')`
     */
    static readonly OP_14: OpCodeType;
    /**
     * The number 15 is pushed onto the stack.
     * @name OP_15
     * @constant {OpCodeType} `OpCodeType('5f')`
     */
    static readonly OP_15: OpCodeType;
    /**
     * The number 16 is pushed onto the stack.
     * @name OP_16
     * @constant {OpCodeType} `OpCodeType('60')`
     */
    static readonly OP_16: OpCodeType;
    /**
     * Does nothing.
     * @name OP_NOP
     * @constant {OpCodeType} `OpCodeType('61')`
     */
    static readonly OP_NOP: OpCodeType;
    /**
     * Puts the version of the protocol under which this transaction will be evaluated onto the stack.
     * @deprecated DISABLED
     * @name OP_VER
     * @constant {OpCodeType} `OpCodeType('62')`
     */
    static readonly OP_VER: OpCodeType;
    /**
     * If the top stack value is TRUE, statement 1 is executed.
     * If the top stack value is FALSE and ELSE is used, statement 2 is executed.
     * If ELSE is NOT used, the script jumps to ENDIF. The top stack value is removed.
     * @deprecated
     * @name OP_IF
     * @constant {OpCodeType} `OpCodeType('63')`
     * @example
     * `[expression] IF
     *  [statement 1]
     * ENDIF`
     * OR
     * `[expression] IF
     *  [statement 1]
     * ELSE
     *  [statement 2]
     * ENDIF`
     */
    static readonly OP_IF: OpCodeType;
    /**
     * If the top stack value is FALSE, statement 1 is executed.
     * If the top stack value is TRUE and ELSE is used, statement 2 is executed. If ELSE is NOT used, the script jumps to ENDIF.
     * The top stack value is removed.
     * @deprecated
     * @name OP_NOTIF
     * @constant {OpCodeType} `OpCodeType('64')`
     * @example
     * `[expression] NOTIF
     *  [statement 1]
     * ENDIF`
     * OR
     * `[expression] NOTIF
     *  [statement 1]
     * ELSE
     *  [statement 2]
     * ENDIF`
     */
    static readonly OP_NOTIF: OpCodeType;
    /**
     * @name OP_VERIF
     * @constant {OpCodeType} `OpCodeType('65')`
     * @deprecated DISABLED
     */
    static readonly OP_VERIF: OpCodeType;
    /**
     * @name OP_VERNOTIF
     * @constant {OpCodeType} `OpCodeType('66')`
     * @deprecated DISABLED
     */
    static readonly OP_VERNOTIF: OpCodeType;
    /**
     * If the preceding IF or NOTIF check was not valid then statement 2 is executed.
     * @name OP_ELSE
     * @constant {OpCodeType} `OpCodeType('67')`
     * @example
     * `[expression] IF
     *  [statement 1]
     * ELSE
     *  [statement 2]
     * ENDIF`
     */
    static readonly OP_ELSE: OpCodeType;
    /**
     * Ends an if/else block. All blocks must end, or the transaction is invalid.
     * An OP_ENDIF without a prior matching OP_IF or OP_NOTIF is also invalid.
     * @name OP_ENDIF
     * @constant {OpCodeType} `OpCodeType('68')`
     * @example
     * `[expression] IF
     *  [statement 1]
     * ELSE
     *  [statement 2]
     * ENDIF`
     */
    static readonly OP_ENDIF: OpCodeType;
    /**
     * Marks transaction as invalid if top stack value is not true. The top stack value is removed.
     * @name OP_VERIFY
     * @constant {OpCodeType} `OpCodeType('69')`
     */
    static readonly OP_VERIFY: OpCodeType;
    /**
     * OP_RETURN can also be used to create "False Return" outputs with a scriptPubKey consisting of `OP_FALSE` `OP_RETURN` followed by data. Such outputs are provably unspendable and should be given a value of zero Satoshis. These outputs can be pruned from storage in the UTXO set, reducing its size. Currently the BitcoinSV network supports multiple FALSE RETURN outputs in a given transaction with each one capable of holding up to 100kB of data. After the Genesis upgrade in 2020 miners will be free to mine transactions containing FALSE RETURN outputs of any size.
     * @name OP_RETURN
     * @constant {OpCodeType} `OpCodeType('6a')`
     */
    static readonly OP_RETURN: OpCodeType;
    /**
     * Puts the input onto the top of the alt stack. Removes it from the main stack.
     * @name OP_TOALTSTACK
     * @constant {OpCodeType} `OpCodeType('6b')`
     */
    static readonly OP_TOALTSTACK: OpCodeType;
    /**
     * Puts the input onto the top of the main stack. Removes it from the alt stack.
     * @name OP_FROMALTSTACK
     * @constant {OpCodeType} `OpCodeType('6c')`
     */
    static readonly OP_FROMALTSTACK: OpCodeType;
    /**
     * Removes the top two stack items.
     * @name OP_2DROP
     * @constant {OpCodeType} `OpCodeType('6d')`
     */
    static readonly OP_2DROP: OpCodeType;
    /**
     * Duplicates the top two stack items.
     * @name OP_2DUP
     * @constant {OpCodeType} `OpCodeType('6e')`
     */
    static readonly OP_2DUP: OpCodeType;
    /**
     * Duplicates the top three stack items.
     * @name OP_3DUP
     * @constant {OpCodeType} `OpCodeType('6f')`
     */
    static readonly OP_3DUP: OpCodeType;
    /**
     * Copies the pair of items two spaces back in the stack to the front.
     * @name OP_2OVER
     * @constant {OpCodeType} `OpCodeType('70')`
     */
    static readonly OP_2OVER: OpCodeType;
    /**
     * The fifth and sixth items back are moved to the top of the stack.
     * @name OP_2ROT
     * @constant {OpCodeType} `OpCodeType('71')`
     */
    static readonly OP_2ROT: OpCodeType;
    /**
     * Swaps the top two pairs of items.
     * @name OP_2SWAP
     * @constant {OpCodeType} `OpCodeType('72')`
     */
    static readonly OP_2SWAP: OpCodeType;
    /**
     * If the top stack value is not 0, duplicate it.
     * @name OP_IFDUP
     * @constant {OpCodeType} `OpCodeType('73')`
     */
    static readonly OP_IFDUP: OpCodeType;
    /**
     * Counts the number of stack items onto the stack and places the value on the top
     * @name OP_DEPTH
     * @constant {OpCodeType} `OpCodeType('74')`
     */
    static readonly OP_DEPTH: OpCodeType;
    /**
     * Removes the top stack item.
     * @name OP_DROP
     * @constant {OpCodeType} `OpCodeType('75')`
     */
    static readonly OP_DROP: OpCodeType;
    /**
     * Duplicates the top stack item.
     * @name OP_DUP
     * @constant {OpCodeType} `OpCodeType('76')`
     */
    static readonly OP_DUP: OpCodeType;
    /**
     * Removes the second-to-top stack item.
     * @name OP_NIP
     * @constant {OpCodeType} `OpCodeType('77')`
     */
    static readonly OP_NIP: OpCodeType;
    /**
     * Copies the second-to-top stack item to the top.
     * @name OP_OVER
     * @constant {OpCodeType} `OpCodeType('78')`
     */
    static readonly OP_OVER: OpCodeType;
    /**
     * The item `n` back in the stack is copied to the top.
     * @name OP_PICK
     * @constant {OpCodeType} `OpCodeType('79')`
     */
    static readonly OP_PICK: OpCodeType;
    /**
     * The item `n` back in the stack is moved to the top.
     * @name OP_ROLL
     * @constant {OpCodeType} `OpCodeType('7a')`
     */
    static readonly OP_ROLL: OpCodeType;
    /**
     * The top three items on the stack are rotated to the left.
     * @name OP_ROT
     * @constant {OpCodeType} `OpCodeType('7b')`
     */
    static readonly OP_ROT: OpCodeType;
    /**
     * The top two items on the stack are swapped.
     * @name OP_SWAP
     * @constant {OpCodeType} `OpCodeType('7c')`
     */
    static readonly OP_SWAP: OpCodeType;
    /**
     * The item at the top of the stack is copied and inserted before the second-to-top item.
     * @name OP_TUCK
     * @constant {OpCodeType} `OpCodeType('7d')`
     */
    static readonly OP_TUCK: OpCodeType;
    /**
     * Concatenates two strings.
     * @name OP_CAT
     * @constant {OpCodeType} `OpCodeType('7e')`
     */
    static readonly OP_CAT: OpCodeType;
    /**
     * Splits byte sequence x at position n.
     * @name OP_SPLIT
     * @constant {OpCodeType} `OpCodeType('7f')`
     */
    static readonly OP_SPLIT: OpCodeType;
    /**
     * Converts numeric value a into byte sequence of length b.
     * @name OP_NUM2BIN
     * @constant {OpCodeType} `OpCodeType('80')`
     */
    static readonly OP_NUM2BIN: OpCodeType;
    /**
     * Converts byte sequence x into a numeric value.
     * @name OP_BIN2NUM
     * @constant {OpCodeType} `OpCodeType('81')`
     */
    static readonly OP_BIN2NUM: OpCodeType;
    /**
     * Pushes the string length of the top element of the stack (without popping it).
     * @name OP_SIZE
     * @constant {OpCodeType} `OpCodeType('82')`
     */
    static readonly OP_SIZE: OpCodeType;
    /**
     * Flips all of the bits in the input.
     * @name OP_INVERT
     * @constant {OpCodeType} `OpCodeType('83')`
     */
    static readonly OP_INVERT: OpCodeType;
    /**
     * Boolean and between each bit in the inputs.
     * @name OP_AND
     * @constant {OpCodeType} `OpCodeType('84')`
     */
    static readonly OP_AND: OpCodeType;
    /**
     * Boolean or between each bit in the inputs.
     * @name OP_OR
     * @constant {OpCodeType} `OpCodeType('85')`
     */
    static readonly OP_OR: OpCodeType;
    /**
     * Boolean exclusive or between each bit in the inputs.
     * @name OP_XOR
     * @constant {OpCodeType} `OpCodeType('86')`
     */
    static readonly OP_XOR: OpCodeType;
    /**
     * Returns 1 if the inputs are exactly equal, 0 otherwise.
     * @name OP_EQUAL
     * @constant {OpCodeType} `OpCodeType('87')`
     */
    static readonly OP_EQUAL: OpCodeType;
    /**
     * Same as `OP_EQUAL`, but runs `OP_VERIFY` afterward.
     * @name OP_EQUALVERIFY
     * @constant {OpCodeType} `OpCodeType('88')`
     */
    static readonly OP_EQUALVERIFY: OpCodeType;
    /**
     * Any opcode not assigned is also reserved. Using an unassigned opcode makes the transaction invalid.
     * @name OP_RESERVED1
     * @constant {OpCodeType} `OpCodeType('89')`
     */
    static readonly OP_RESERVED1: OpCodeType;
    /**
     * Any opcode not assigned is also reserved. Using an unassigned opcode makes the transaction invalid.
     * @name OP_RESERVED2
     * @constant {OpCodeType} `OpCodeType('8a')`
     */
    static readonly OP_RESERVED2: OpCodeType;
    /**
     * 1 is added to the input.
     * @name OP_1ADD
     * @constant {OpCodeType} `OpCodeType('8b')`
     */
    static readonly OP_1ADD: OpCodeType;
    /**
     * 1 is subtracted from the input.
     * @name OP_1SUB
     * @constant {OpCodeType} `OpCodeType('8c')`
     */
    static readonly OP_1SUB: OpCodeType;
    /**
     * The input is multiplied by 2. **DISABLED** now. (This opcode is scheduled to be re-enabled in the Chronicle update)
     * @name OP_2MUL
     * @constant {OpCodeType} `OpCodeType('8d')`
     */
    static readonly OP_2MUL: OpCodeType;
    /**
     * The input is divided by 2. **DISABLED** now. (This opcode is scheduled to be re-enabled in the Chronicle update)
     * @name OP_2DIV
     * @constant {OpCodeType} `OpCodeType('8e')`
     */
    static readonly OP_2DIV: OpCodeType;
    /**
     * The sign of the input is flipped.
     * @name OP_NEGATE
     * @constant {OpCodeType} `OpCodeType('8f')`
     */
    static readonly OP_NEGATE: OpCodeType;
    /**
     * The input is made positive.
     * @name OP_ABS
     * @constant {OpCodeType} `OpCodeType('90')`
     */
    static readonly OP_ABS: OpCodeType;
    /**
     * If the input is 0 or 1, it is flipped. Otherwise the output will be 0.
     * @name OP_NOT
     * @constant {OpCodeType} `OpCodeType('91')`
     */
    static readonly OP_NOT: OpCodeType;
    /**
     * Returns 0 if the input is 0. 1 otherwise.
     * @name OP_0NOTEQUAL
     * @constant {OpCodeType} `OpCodeType('92')`
     */
    static readonly OP_0NOTEQUAL: OpCodeType;
    /**
     * a is added to b.
     * @name OP_ADD
     * @constant {OpCodeType} `OpCodeType('93')`
     */
    static readonly OP_ADD: OpCodeType;
    /**
     * b is subtracted from a.
     * @name OP_SUB
     * @constant {OpCodeType} `OpCodeType('94')`
     */
    static readonly OP_SUB: OpCodeType;
    /**
     * a is multiplied by b.
     * @name OP_MUL
     * @constant {OpCodeType} `OpCodeType('95')`
     */
    static readonly OP_MUL: OpCodeType;
    /**
     * a is divided by b.
     * @name OP_DIV
     * @constant {OpCodeType} `OpCodeType('96')`
     */
    static readonly OP_DIV: OpCodeType;
    /**
     * Returns the remainder after dividing a by b.
     * @name OP_MOD
     * @constant {OpCodeType} `OpCodeType('97')`
     */
    static readonly OP_MOD: OpCodeType;
    /**
     * Logical left shift b bits. Sign data is discarded
     * @name OP_LSHIFT
     * @constant {OpCodeType} `OpCodeType('98')`
     */
    static readonly OP_LSHIFT: OpCodeType;
    /**
     * Logical right shift b bits. Sign data is discarded
     * @name OP_RSHIFT
     * @constant {OpCodeType} `OpCodeType('99')`
     */
    static readonly OP_RSHIFT: OpCodeType;
    /**
     * If both a and b are not 0, the output is 1. Otherwise 0.
     * @name OP_BOOLAND
     * @constant {OpCodeType} `OpCodeType('9a')`
     */
    static readonly OP_BOOLAND: OpCodeType;
    /**
     * If a or b is not 0, the output is 1. Otherwise 0.
     * @name OP_BOOLOR
     * @constant {OpCodeType} `OpCodeType('9b')`
     */
    static readonly OP_BOOLOR: OpCodeType;
    /**
     * Returns 1 if the numbers are equal, 0 otherwise.
     * @name OP_NUMEQUAL
     * @constant {OpCodeType} `OpCodeType('9c')`
     */
    static readonly OP_NUMEQUAL: OpCodeType;
    /**
     * Same as `OP_NUMEQUAL`, but runs `OP_VERIFY` afterward.
     * @name OP_NUMEQUALVERIFY
     * @constant {OpCodeType} `OpCodeType('9d')`
     */
    static readonly OP_NUMEQUALVERIFY: OpCodeType;
    /**
     * Returns 1 if the numbers are not equal, 0 otherwise.
     * @name OP_NUMNOTEQUAL
     * @constant {OpCodeType} `OpCodeType('9e')`
     */
    static readonly OP_NUMNOTEQUAL: OpCodeType;
    /**
     * Returns 1 if a is less than b, 0 otherwise.
     * @name OP_LESSTHAN
     * @constant {OpCodeType} `OpCodeType('9f')`
     */
    static readonly OP_LESSTHAN: OpCodeType;
    /**
     * Returns 1 if a is greater than b, 0 otherwise.
     * @name OP_GREATERTHAN
     * @constant {OpCodeType} `OpCodeType('a0')`
     */
    static readonly OP_GREATERTHAN: OpCodeType;
    /**
     * Returns 1 if a is less than or equal to b, 0 otherwise.
     * @name OP_LESSTHANOREQUAL
     * @constant {OpCodeType} `OpCodeType('a1')`
     */
    static readonly OP_LESSTHANOREQUAL: OpCodeType;
    /**
     * Returns 1 if a is greater than or equal to b, 0 otherwise.
     * @name OP_GREATERTHANOREQUAL
     * @constant {OpCodeType} `OpCodeType('a2')`
     */
    static readonly OP_GREATERTHANOREQUAL: OpCodeType;
    /**
     * Returns the smaller of a and b.
     * @name OP_MIN
     * @constant {OpCodeType} `OpCodeType('a3')`
     */
    static readonly OP_MIN: OpCodeType;
    /**
     * Returns the larger of a and b.
     * @name OP_MAX
     * @constant {OpCodeType} `OpCodeType('a4')`
     */
    static readonly OP_MAX: OpCodeType;
    /**
     * Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.
     * @name OP_WITHIN
     * @constant {OpCodeType} `OpCodeType('a5')`
     */
    static readonly OP_WITHIN: OpCodeType;
    /**
     * The input is hashed using RIPEMD-160.
     * @name OP_RIPEMD160
     * @constant {OpCodeType} `OpCodeType('a6')`
     */
    static readonly OP_RIPEMD160: OpCodeType;
    /**
     * The input is hashed using SHA-1.
     * @name OP_SHA1
     * @constant {OpCodeType} `OpCodeType('a7')`
     */
    static readonly OP_SHA1: OpCodeType;
    /**
     * The input is hashed using SHA-256.
     * @name OP_SHA256
     * @constant {OpCodeType} `OpCodeType('a8')`
     */
    static readonly OP_SHA256: OpCodeType;
    /**
     * The input is hashed twice: first with SHA-256 and then with RIPEMD-160.
     * @name OP_HASH160
     * @constant {OpCodeType} `OpCodeType('a9')`
     */
    static readonly OP_HASH160: OpCodeType;
    /**
     * The input is hashed two times with SHA-256.
     * @name OP_HASH256
     * @constant {OpCodeType} `OpCodeType('aa')`
     */
    static readonly OP_HASH256: OpCodeType;
    /**
     * All of the signature checking words will only match signatures to the data after the most recently-executed
     * [OP_CODESEPARATOR]{@link https://wiki.bitcoinsv.io/index.php/OP_CODESEPARATOR}.
     * @name OP_CODESEPARATOR
     * @constant {OpCodeType} `OpCodeType('ab')`
     */
    static readonly OP_CODESEPARATOR: OpCodeType;
    /**
     * The entire transaction's outputs, inputs, and script (from the most recently-executed [OP_CODESEPARATOR]{@link https://wiki.bitcoinsv.io/index.php/OP_CODESEPARATOR} to the end) are hashed.
     * The signature used by [OP_CHECKSIG]{@link https://wiki.bitcoinsv.io/index.php/OP_CHECKSIG} must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.
     * @name OP_CHECKSIG
     * @constant {OpCodeType} `OpCodeType('ac')`
     */
    static readonly OP_CHECKSIG: OpCodeType;
    /**
     * Same as `OP_CHECKSIG`, but `OP_VERIFY` is executed afterward.
     * @name OP_CHECKSIGVERIFY
     * @constant {OpCodeType} `OpCodeType('ad')`
     */
    static readonly OP_CHECKSIGVERIFY: OpCodeType;
    /**
     * 	Compares the first signature against each public key until it finds an ECDSA match. Starting with the subsequent public key, it compares the second signature against each remaining public key until it finds an ECDSA match. The process is repeated until all signatures have been checked or not enough public keys remain to produce a successful result. All signatures need to match a public key. Because public keys are not checked again if they fail any signature comparison, signatures must be placed in the scriptSig using the same order as their corresponding public keys were placed in the scriptPubKey or redeemScript. If all signatures are valid, 1 is returned, 0 otherwise. Due to a bug, an extra unused value (x) is removed from the stack. Script spenders must account for this by adding a junk value (typically zero) to the stack.
     * @name OP_CHECKMULTISIG
     * @constant {OpCodeType} `OpCodeType('ae')`
     */
    static readonly OP_CHECKMULTISIG: OpCodeType;
    /**
     * Same as `OP_CHECKMULTISIG`, but `OP_VERIFY` is executed afterward.
     * @name OP_CHECKMULTISIGVERIFY
     * @constant {OpCodeType} `OpCodeType('af')`
     */
    static readonly OP_CHECKMULTISIGVERIFY: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP1
     * @constant {OpCodeType} `OpCodeType('b0')`
     */
    static readonly OP_NOP1: OpCodeType;
    /**
     * No operation. The word is ignored. (previously OP_CHECKLOCKTIMEVERIFY)
     * @name OP_NOP2
     * @constant {OpCodeType} `OpCodeType('b1')`
     */
    static readonly OP_NOP2: OpCodeType;
    /**
     * No operation. The word is ignored. (previously OP_CHECKSEQUENCEVERIFY)
     * @name OP_NOP3
     * @constant {OpCodeType} `OpCodeType('b2')`
     */
    static readonly OP_NOP3: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP4
     * @constant {OpCodeType} `OpCodeType('b3')`
     */
    static readonly OP_NOP4: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP5
     * @constant {OpCodeType} `OpCodeType('b4')`
     */
    static readonly OP_NOP5: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP6
     * @constant {OpCodeType} `OpCodeType('b5')`
     */
    static readonly OP_NOP6: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP7
     * @constant {OpCodeType} `OpCodeType('b6')`
     */
    static readonly OP_NOP7: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP8
     * @constant {OpCodeType} `OpCodeType('b7')`
     */
    static readonly OP_NOP8: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP9
     * @constant {OpCodeType} `OpCodeType('b8')`
     */
    static readonly OP_NOP9: OpCodeType;
    /**
     * No operation. The word is ignored.
     * @name OP_NOP10
     * @constant {OpCodeType} `OpCodeType('b9')`
     */
    static readonly OP_NOP10: OpCodeType;
    /**
     * Represents a public key hashed with OP_HASH160. The word is used internally for assisting with transaction matching. They are invalid if used in actual scripts.
     * @name OP_PUBKEYHASH
     * @constant {OpCodeType} `OpCodeType('fd')`
     */
    static readonly OP_PUBKEYHASH: OpCodeType;
    /**
     * Represents a public key compatible with OP_CHECKSIG. The word is used internally for assisting with transaction matching. They are invalid if used in actual scripts.
     * @name OP_PUBKEY
     * @constant {OpCodeType} `OpCodeType('fe')`
     */
    static readonly OP_PUBKEY: OpCodeType;
    /**
     * Matches any opcode that is not yet assigned. The word is used internally for assisting with transaction matching. They are invalid if used in actual scripts.
     * @name OP_PUBKEY
     * @constant {OpCodeType} `OpCodeType('ff')`
     */
    static readonly OP_INVALIDOPCODE: OpCodeType;
}
/**
 * The Utils library provides a set of commonly used utility functions.
 * @category Standard Contracts
 */
export declare class Utils {
    /** number of string to denote output value  */
    static readonly OutputValueLen: bigint;
    /** number of string to denote a public key hash */
    static readonly PubKeyHashLen: bigint;
    /**
     * convert signed integer `n` to unsigned integer of `l` string, in little endian
     * @param {bigint} n the number to be converted
     * @param {bigint} l expected length
     * @returns {ByteString} returns a `ByteString`
     */
    static toLEUnsigned(n: bigint, l: bigint): ByteString;
    /**
     * convert `ByteString` to unsigned integer, in sign-magnitude little endian
     * @param {ByteString} bytes the `ByteString` to be converted
     * @returns {bigint} returns a number
     */
    static fromLEUnsigned(bytes: ByteString): bigint;
    /**
     * read [VarInt (variable integer)]{@link https://learnmeabitcoin.com/technical/general/compact-size/}-encoded data from the beginning of 'buf'
     * @param {ByteString} buf a buffer `ByteString` of format: [prefix FD/FE/FF +] length + data
     * @returns return data
     */
    static readVarint(buf: ByteString): ByteString;
    /**
     * encode data in 'buf' to a [VarInt (variable integer)]{@link https://learnmeabitcoin.com/technical/general/compact-size/} format; opposite of readVarint
     * @param {ByteString} buf a buffer `ByteString` containing the data
     * @returns return format: [prefix FD/FE/FF +] length + data
     */
    static writeVarint(buf: ByteString): ByteString;
    /**
     * build a tx output from its script and satoshi amount
     * @param {ByteString} outputScript the locking script
     * @param {bigint} outputSatoshis the satoshi amount
     * @returns {ByteString} a `ByteString` that represents an output
     */
    static buildOutput(outputScript: ByteString, outputSatoshis: bigint): ByteString;
    /**
     * constructs a P2PKH script from a given PubKeyHash
     * @param {PubKeyHash} pubKeyHash - the recipient's public key hash
     * @returns {ByteString} a `ByteString` representing the P2PKH script
     */
    static buildPublicKeyHashScript(pubKeyHash: PubKeyHash): ByteString;
    /**
     * constructs a P2PKH output from a given PubKeyHash and satoshi amount
     * @param {PubKeyHash} pubKeyHash - the recipient's public key hash
     * @param {bigint} amount - the satoshi amount
     * @returns {ByteString} a `ByteString` representing the P2PKH output
     */
    static buildPublicKeyHashOutput(pubKeyHash: PubKeyHash, amount: bigint): ByteString;
    /**
     * constructs a standard payment (P2PKH) script from a given address
     * @param {Addr} addr - the recipient's address
     * @returns {ByteString} a `ByteString` representing the P2PKH script
     */
    static buildAddressScript(addr: Addr): ByteString;
    /**
     * constructs a standard payment (P2PKH) output from a given address and satoshi amount
     * @param {Addr} addr - the recipient's address
     * @param {bigint} amount - the satoshi amount
     * @returns {ByteString} a `ByteString` representing the P2PKH output
     */
    static buildAddressOutput(addr: Addr, amount: bigint): ByteString;
    /**
     * build `OP_FALSE OP_RETURN` script from data payload
     * @param {ByteString} data the data payload
     * @returns {ByteString} a ByteString contains the data payload
     */
    static buildOpreturnScript(data: ByteString): ByteString;
}
/**
 * A library to access various fields in the [preimage]{@link https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md}.
 * For example, we usually use `SigHash.scriptCode(preimage: SigHashPreimage)` to access the scriptCode of the preimage,
 * and use `SigHash.value(preimage: SigHashPreimage)` to access the value field of the preimage, which is the value of the number of bitcoins spent in this contract.
 * @category Standard Contracts
 */
export declare class SigHash {
    static readonly ALL: SigHashType;
    static readonly NONE: SigHashType;
    static readonly SINGLE: SigHashType;
    static readonly ANYONECANPAY_ALL: SigHashType;
    static readonly ANYONECANPAY_NONE: SigHashType;
    static readonly ANYONECANPAY_SINGLE: SigHashType;
    /**
     * get version of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return version `ByteString` in 4-byte little endian
     */
    static nVersion(preimage: SigHashPreimage): ByteString;
    /**
     * get hashPrevouts of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return hashPrevouts `ByteString` in 32-byte little endian
     */
    static hashPrevouts(preimage: SigHashPreimage): ByteString;
    /**
     * get hashSequence of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return hashSequence `ByteString` in 32-byte little endian
     */
    static hashSequence(preimage: SigHashPreimage): ByteString;
    /**
     * get outpoint of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return outpoint `ByteString` in 32-byte hash + 4-byte little endian
     */
    static outpoint(preimage: SigHashPreimage): ByteString;
    /**
     * get scriptCode of the transaction from the preimage. scriptCode is just scriptPubKey if there is no CODESEPARATOR in the latter
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return scriptCode `ByteString`
     */
    static scriptCode(preimage: SigHashPreimage): ByteString;
    /**
     * get value of the output spent by this input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return value `ByteString` in 8-byte little endian
     */
    static valueRaw(preimage: SigHashPreimage): ByteString;
    /**
     * get value of the output spent by this input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {bigint} return value
     */
    static value(preimage: SigHashPreimage): bigint;
    /**
     * nSequence of the input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return nSequence `ByteString` in 4-byte little endian
     */
    static nSequenceRaw(preimage: SigHashPreimage): ByteString;
    /**
     * nSequence of the input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {bigint} return nSequence
     */
    static nSequence(preimage: SigHashPreimage): bigint;
    /**
     * get hashOutputs of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return hashOutputs `ByteString` in 32-byte hash
     */
    static hashOutputs(preimage: SigHashPreimage): ByteString;
    /**
     * get nLocktime of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return nLocktime `ByteString` in 4-byte little endian
     */
    static nLocktimeRaw(preimage: SigHashPreimage): ByteString;
    /**
     * get nLocktime of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {bigint} return nLocktime
     */
    static nLocktime(preimage: SigHashPreimage): bigint;
    /**
     * sighash type of the signature from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {SigHashType} return sighash type
     */
    static sigHashType(preimage: SigHashPreimage): SigHashType;
}
/**
 * A reader to parse a ByteString buffer
 * @category Standard Contracts
 */
export declare class VarIntReader {
    static readonly StateLen: bigint;
    static readonly VersionLen: bigint;
    static readonly Version: bigint;
    buf: ByteString;
    pos: bigint;
    constructor(buf: ByteString);
    /**
     * Check if all have been read
     * @returns true if all have been read
     */
    eof(): boolean;
    /**
     * read bytes which encoded with bitcoin [value-pushing words]{@link https://wiki.bitcoinsv.io/index.php/Opcodes_used_in_Bitcoin_Script}
     * @returns true if all have been read
     */
    readBytes(): ByteString;
    /**
     * read a byte as boolean
     * @returns true if the read byte not equal to '00'
     */
    readBool(): boolean;
    /**
     * read bytes as `readBytes` and convert it to a number with `byteString2Int`
     * @returns a number
     */
    readInt(): bigint;
    /**
     * @ignore
     * @param scriptCode the scriptCode of the preimage
     * @returns a offset in the scriptCode ByteString
     */
    static getStateStart(scriptCode: ByteString): bigint;
}
/**
 * A writer that serializes `ByteString`, `boolean`, `bigint`
 * @category Standard Contracts
 */
export declare class VarIntWriter {
    /**
     * serializes `ByteString` with `VarInt` encoding
     * @param buf a `ByteString`
     * @returns serialized `ByteString`
     */
    static writeBytes(buf: ByteString): ByteString;
    /**
     * serializes `boolean` with fixed 1 byte
     * @param x a boolean
     * @returns serialized `ByteString`
     */
    static writeBool(x: boolean): ByteString;
    /**
     * serializes `bigint` with `VarInt` encoding
     * @param x a boolean
     * @returns serialized `ByteString`
     */
    static writeInt(x: bigint): ByteString;
    /**
     * @ignore
     * @param stateBuf
     * @returns serialized `ByteString` contains state of the contract
     */
    static serializeState(stateBuf: ByteString): ByteString;
}
/**
 * library to access current tx
 * @ignore
 * @class
 * @category Standard Contracts
 */
export declare class Tx {
    static readonly privKey: PrivKey;
    static readonly pubKey: PubKey;
    static readonly invK: bigint;
    static readonly r: bigint;
    static readonly rBigEndian: ByteString;
    static normalize(k: bigint, modulus: bigint): bigint;
    static sign(h: bigint, privKey: PrivKey, inverseK: bigint, r: bigint, rBigEndian: ByteString, sigHashType: SigHashType): Sig;
    static fromBEUnsigned(bytes: ByteString): bigint;
    static checkPreimageOpt(txPreimage: SigHashPreimage): boolean;
    static checkPreimageOpt_(txPreimage: SigHashPreimage): boolean;
    static checkPreimageAdvancedOCS(txPreimage: SigHashPreimage, privKey: PrivKey, pubKey: PubKey, inverseK: bigint, r: bigint, rBigEndian: string, sigHashType: SigHashType): boolean;
    static checkPreimageOCS(txPreimage: SigHashPreimage): boolean;
    static checkPreimageSigHashTypeOCS(txPreimage: SigHashPreimage, sigHashType: SigHashType): boolean;
    static checkPreimageOptOCS(txPreimage: SigHashPreimage): boolean;
    static checkPreimageOptOCS_(txPreimage: SigHashPreimage): boolean;
    static isFirstCall(txPreimage: SigHashPreimage): boolean;
}
/**
 * A library than contains some commonly used constant values
 * @category Standard Contracts
 */
export declare class Constants {
    /** length of `ByteString` to denote input sequence */
    static readonly InputSeqLen: bigint;
    /** length of `ByteString` to denote output value */
    static readonly OutputValueLen: bigint;
    /** length of `ByteString` to denote a public key (compressed) */
    static readonly PubKeyLen: bigint;
    /** length of `ByteString` to denote a public key hash */
    static readonly PubKeyHashLen: bigint;
    /** length of `ByteString` to denote a tx id */
    static readonly TxIdLen: bigint;
    /** length of `ByteString` to denote a outpoint */
    static readonly OutpointLen: bigint;
}
