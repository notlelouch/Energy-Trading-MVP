"use strict";
// build-in function
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = exports.Tx = exports.VarIntWriter = exports.VarIntReader = exports.SigHash = exports.Utils = exports.OpCode = exports.asm = exports.rshift = exports.lshift = exports.assert = exports.pubKey2Addr = exports.hash256 = exports.hash160 = exports.sha256 = exports.sha1 = exports.ripemd160 = exports.within = exports.max = exports.min = exports.abs = exports.exit = exports.reverseByteString = exports.len = exports.byteString2Int = exports.int2ByteString = exports.fill = exports.slice = exports.getSortedItem = exports.invert = exports.or = exports.xor = exports.and = void 0;
const scryptlib_1 = require("scryptlib");
const types_1 = require("./types");
const lodash_1 = require("lodash");
var scryptlib_2 = require("scryptlib");
Object.defineProperty(exports, "and", { enumerable: true, get: function () { return scryptlib_2.and; } });
Object.defineProperty(exports, "xor", { enumerable: true, get: function () { return scryptlib_2.xor; } });
Object.defineProperty(exports, "or", { enumerable: true, get: function () { return scryptlib_2.or; } });
Object.defineProperty(exports, "invert", { enumerable: true, get: function () { return scryptlib_2.invert; } });
Object.defineProperty(exports, "getSortedItem", { enumerable: true, get: function () { return scryptlib_2.getSortedItem; } });
/**
 * Returns a section of a ByteString.
 * @param byteString The ByteString.
 * @param start The beginning byte index of the specified portion of ByteString, included.
 * @param end The end byte index of the specified portion of ByteString, excluded.
 *  If this value is not specified, the sub-section continues to the end of ByteString.
 */
function slice(byteString, start, end) {
    const startIndex = Number(start) * 2;
    const endIndex = typeof end === 'bigint' ? Number(end) * 2 : byteString.length;
    if (startIndex < 0 || endIndex < 0) {
        throw new Error('index should not be negative');
    }
    if (typeof end === 'bigint' && startIndex > endIndex) {
        throw new Error('start index should be less than or equal to end index');
    }
    if (startIndex > byteString.length) {
        throw new Error('start index should not be greater than the length');
    }
    if (endIndex > byteString.length) {
        throw new Error('end index should not be greater than the length');
    }
    return byteString.slice(startIndex, endIndex);
}
exports.slice = slice;
/**
 * Returns an `FixedArray` with all `size` elements set to `value`, where `value` can be any type.
 * Note that `length` must be a numeric literal or a compiled-time constant
 * @param value - the value of each element to set
 * @param length - the length of FixedArray
 */
function fill(value, length) {
    return Array(length).fill(0).map(_ => (0, lodash_1.cloneDeep)(value));
}
exports.fill = fill;
/**
 * bigint can be converted to string with int2ByteString.
 * If `size` is not passed, the number `n` is converted to a ByteString with as few bytes as possible.
 * Otherwise, converts the number `n` to a ByteString of the specified size, including the sign bit. Fails if the number cannot be accommodated.
 * @param n - a number being converts
 * @param size - the size of the ByteString
 * @category Bytes Operations
 */
function int2ByteString(n, size) {
    if (size === undefined) {
        const num = new scryptlib_1.bsv.crypto.BN(n);
        return num.toSM({ endian: 'little' }).toString('hex');
    }
    return (0, scryptlib_1.num2bin)(n, Number(size));
}
exports.int2ByteString = int2ByteString;
/**
 * ByteString can be converted to bigint using function byteString2Int.
 * @category Bytes Operations
 */
function byteString2Int(a) {
    return BigInt((0, scryptlib_1.bin2num)(a));
}
exports.byteString2Int = byteString2Int;
/**
 * Returns the length of the ByteString. Not the length of the string.
 * @category Bytes Operations
 * @param a - a ByteString
 * @returns {bigint} The length of the ByteString.
 */
function len(a) { return BigInt(a.length / 2); }
exports.len = len;
/**
 * Returns reversed bytes of b, which is of size bytes. Note size must be a compiled-time constant.
 * It is often useful when converting a number between little-endian and big-endian.
 * @category Bytes Operations
 * @param b - a ByteString to be reversed
 * @param size - the size of the ByteString.
 * @returns {ByteString} reversed ByteString.
 */
function reverseByteString(b, size) {
    let l = len(b);
    if (l != size) {
        throw new Error(`reverseByteString error, expected c = ${l}`);
    }
    return b.match(/[a-fA-F0-9]{2}/g).reverse().join('');
}
exports.reverseByteString = reverseByteString;
/**
 * @ignore
 * `exit(bool status)`; statement terminates contract execution.
 * @category exit()
 * @param status - If status is true, contract succeeds; otherwise, it fails.
 *
 */
function exit(status) { }
exports.exit = exit;
;
/**
 * The input `a` is made positive.
 * @category Math
 */
function abs(a) {
    if (a < 0) {
        return -a;
    }
    return a;
}
exports.abs = abs;
/**
 * Returns the smallest of `a` and `b`.
 * @category Math
 */
function min(a, b) {
    return (a - b < 0 ? a : b);
}
exports.min = min;
/**
 * Returns the largest of `a` and `b`.
 * @category Math
 */
function max(a, b) {
    return (a - b > 0 ? a : b);
}
exports.max = max;
/**
 * Returns true if `x` is within the specified range (left-inclusive), false otherwise.
 * @category Math
 */
function within(x, min, max) {
    return (min - x <= 0) && (x - max < 0);
}
exports.within = within;
/**
 * A RIPEMD160 hash, which is always 160 bits or 20 bytes long.
 * See:
 * https://en.wikipedia.org/wiki/RIPEMD
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Ripemd160} The hash in the form of a ByteString.
 */
function ripemd160(a) {
    return (0, scryptlib_1.Ripemd160)(scryptlib_1.bsv.crypto.Hash.ripemd160(Buffer.from(a, 'hex')).toString('hex'));
}
exports.ripemd160 = ripemd160;
/**
 * A SHA or SHA1 hash, which is always 160 bits or 20 bytes long.
 *
 * See:
 * https://en.wikipedia.org/wiki/SHA-1
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Sha1} The hash in the form of a string.
 */
function sha1(a) {
    return (0, scryptlib_1.Sha1)(scryptlib_1.bsv.crypto.Hash.sha1(Buffer.from(a, 'hex')).toString('hex'));
}
exports.sha1 = sha1;
/**
 * A SHA256 hash, which is always 256 bits or 32 bytes long.
 *
 * See:
 * https://www.movable-type.co.uk/scripts/sha256.html
 * @category Hashing
 * @param {ByteString} a ByteString Data, a.k.a. pre-image, which can be any size.
 * @returns {Sha256} The hash in the form of a string.
 */
function sha256(a) {
    return (0, scryptlib_1.Sha256)(scryptlib_1.bsv.crypto.Hash.sha256(Buffer.from(a, 'hex')).toString('hex'));
}
exports.sha256 = sha256;
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
function hash160(a) {
    return (0, scryptlib_1.Ripemd160)(scryptlib_1.bsv.crypto.Hash.sha256ripemd160(Buffer.from(a, 'hex')).toString('hex'));
}
exports.hash160 = hash160;
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
function hash256(a) { return sha256(sha256(a)); }
exports.hash256 = hash256;
/**
 * Get Addr for PubKey.
 * Under the hood this just wraps the hash160 function.
 * @category Hashing
 * @param {PubKey} the public key.
 * @returns {Addr} address for the passed public key.
 */
function pubKey2Addr(a) {
    return hash160(a);
}
exports.pubKey2Addr = pubKey2Addr;
/**
 * `assert(condition: boolean, errorMsg?: string)`
 * Throw an Error with the optional error message if condition is false. Otherwise, nothing happens.
 * @category assert
 */
function assert(condition, msg) {
    if (!condition) {
        const message = 'Execution failed' + (msg ? `, ${msg}` : '');
        throw new Error(message);
    }
}
exports.assert = assert;
function simplePow(x, y) {
    let calced = (0, scryptlib_1.Int)(1);
    for (let i = 0, e = y; i < e; i++) {
        calced *= x;
    }
    return calced;
}
function pow2(n) {
    return simplePow((0, scryptlib_1.Int)(2), n);
}
;
/**
 * Arithmetic left shift, returns `x * 2^n`.
 * More detail about [Bitwise Operator]{@link https://docs.scrypt.io/how-to-write-a-contract/built-ins#bitwise-operator}
 * @category Bitwise Operator
 */
function lshift(x, n) {
    assert(n >= 0, 'n < 0');
    return x * pow2(n);
}
exports.lshift = lshift;
/**
 * Arithmetic right shift, returns `x / 2^n`.
 * More detail about [Bitwise Operator]{@link https://docs.scrypt.io/how-to-write-a-contract/built-ins#bitwise-operator}
 * @category Bitwise Operator
 */
function rshift(x, n) {
    assert(n >= 0, 'n < 0');
    let ret = x / pow2(n);
    return n == (0, scryptlib_1.Int)(0) ? x : (x % (0, scryptlib_1.Int)(2) == (0, scryptlib_1.Int)(-1) ? (ret - (0, scryptlib_1.Int)(1)) : (x < (0, scryptlib_1.Int)(0) && ret == (0, scryptlib_1.Int)(0)) ? (0, scryptlib_1.Int)(-1) : ret);
}
exports.rshift = rshift;
/**
 * @ignore
 */
function asm(code) {
    throw new Error('unimplemented');
}
exports.asm = asm;
;
/**
 * Opcodes used in [Bitcoin Script]{@link https://wiki.bitcoinsv.io/index.php/Opcodes_used_in_Bitcoin_Script}
 * @category Standard Contracts
 */
class OpCode {
}
exports.OpCode = OpCode;
/**
 * An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
 * @name OP_0
 * @constant {OpCodeType} `OpCodeType('00')`
 */
OpCode.OP_0 = (0, types_1.OpCodeType)('00');
/**
 * An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)
 * @name OP_FALSE
 * @constant {OpCodeType} `OpCodeType('00')`
 */
OpCode.OP_FALSE = (0, types_1.OpCodeType)('00');
/**
 * The next byte contains the number of bytes to be pushed onto the stack.
 * @name OP_PUSHDATA1
 * @constant {OpCodeType} `OpCodeType('4c')`
 */
OpCode.OP_PUSHDATA1 = (0, types_1.OpCodeType)('4c');
/**
 * The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.
 * @name OP_PUSHDATA2
 * @constant {OpCodeType} `OpCodeType('4d')`
 */
OpCode.OP_PUSHDATA2 = (0, types_1.OpCodeType)('4d');
/**
 * The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.
 * @name OP_PUSHDATA4
 * @constant {OpCodeType} `OpCodeType('4e')`
 */
OpCode.OP_PUSHDATA4 = (0, types_1.OpCodeType)('4e');
/**
 * The number -1 is pushed onto the stack.
 * @name OP_1NEGATE
 * @constant {OpCodeType} `OpCodeType('4f')`
 */
OpCode.OP_1NEGATE = (0, types_1.OpCodeType)('4f');
/**
 * Transaction is invalid unless occuring in an unexecuted OP_IF branch
 * @name OP_RESERVED
 * @constant {OpCodeType} `OpCodeType('50')`
 */
OpCode.OP_RESERVED = (0, types_1.OpCodeType)('50');
/**
 * The number 1 is pushed onto the stack.
 * @name OP_1
 * @constant {OpCodeType} `OpCodeType('51')`
 */
OpCode.OP_1 = (0, types_1.OpCodeType)('51');
/**
 * The number 1 is pushed onto the stack.
 * @name OP_TRUE
 * @constant {OpCodeType} `OpCodeType('51')`
 */
OpCode.OP_TRUE = (0, types_1.OpCodeType)('51');
/**
 * The number 2 is pushed onto the stack.
 * @name OP_2
 * @constant {OpCodeType} `OpCodeType('52')`
 */
OpCode.OP_2 = (0, types_1.OpCodeType)('52');
/**
 * The number 3 is pushed onto the stack.
 * @name OP_3
 * @constant {OpCodeType} `OpCodeType('53')`
 */
OpCode.OP_3 = (0, types_1.OpCodeType)('53');
/**
 * The number 4 is pushed onto the stack.
 * @name OP_4
 * @constant {OpCodeType} `OpCodeType('54')`
 */
OpCode.OP_4 = (0, types_1.OpCodeType)('54');
/**
 * The number 5 is pushed onto the stack.
 * @name OP_5
 * @constant {OpCodeType} `OpCodeType('55')`
 */
OpCode.OP_5 = (0, types_1.OpCodeType)('55');
/**
 * The number 6 is pushed onto the stack.
 * @name OP_6
 * @constant {OpCodeType} `OpCodeType('56')`
 */
OpCode.OP_6 = (0, types_1.OpCodeType)('56');
/**
 * The number 7 is pushed onto the stack.
 * @name OP_7
 * @constant {OpCodeType} `OpCodeType('57')`
 */
OpCode.OP_7 = (0, types_1.OpCodeType)('57');
/**
 * The number 8 is pushed onto the stack.
 * @name OP_8
 * @constant {OpCodeType} `OpCodeType('58')`
 */
OpCode.OP_8 = (0, types_1.OpCodeType)('58');
/**
 * The number 9 is pushed onto the stack.
 * @name OP_9
 * @constant {OpCodeType} `OpCodeType('59')`
 */
OpCode.OP_9 = (0, types_1.OpCodeType)('59');
/**
 * The number 10 is pushed onto the stack.
 * @name OP_10
 * @constant {OpCodeType} `OpCodeType('5a')`
 */
OpCode.OP_10 = (0, types_1.OpCodeType)('5a');
/**
 * The number 11 is pushed onto the stack.
 * @name OP_11
 * @constant {OpCodeType} `OpCodeType('5b')`
 */
OpCode.OP_11 = (0, types_1.OpCodeType)('5b');
/**
 * The number 12 is pushed onto the stack.
 * @name OP_12
 * @constant {OpCodeType} `OpCodeType('5c')`
 */
OpCode.OP_12 = (0, types_1.OpCodeType)('5c');
/**
 * The number 13 is pushed onto the stack.
 * @name OP_13
 * @constant {OpCodeType} `OpCodeType('5d')`
 */
OpCode.OP_13 = (0, types_1.OpCodeType)('5d');
/**
 * The number 14 is pushed onto the stack.
 * @name OP_14
 * @constant {OpCodeType} `OpCodeType('5e')`
 */
OpCode.OP_14 = (0, types_1.OpCodeType)('5e');
/**
 * The number 15 is pushed onto the stack.
 * @name OP_15
 * @constant {OpCodeType} `OpCodeType('5f')`
 */
OpCode.OP_15 = (0, types_1.OpCodeType)('5f');
/**
 * The number 16 is pushed onto the stack.
 * @name OP_16
 * @constant {OpCodeType} `OpCodeType('60')`
 */
OpCode.OP_16 = (0, types_1.OpCodeType)('60');
/**
 * Does nothing.
 * @name OP_NOP
 * @constant {OpCodeType} `OpCodeType('61')`
 */
OpCode.OP_NOP = (0, types_1.OpCodeType)('61');
/**
 * Puts the version of the protocol under which this transaction will be evaluated onto the stack.
 * @deprecated DISABLED
 * @name OP_VER
 * @constant {OpCodeType} `OpCodeType('62')`
 */
OpCode.OP_VER = (0, types_1.OpCodeType)('62');
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
OpCode.OP_IF = (0, types_1.OpCodeType)('63');
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
OpCode.OP_NOTIF = (0, types_1.OpCodeType)('64');
/**
 * @name OP_VERIF
 * @constant {OpCodeType} `OpCodeType('65')`
 * @deprecated DISABLED
 */
OpCode.OP_VERIF = (0, types_1.OpCodeType)('65');
/**
 * @name OP_VERNOTIF
 * @constant {OpCodeType} `OpCodeType('66')`
 * @deprecated DISABLED
 */
OpCode.OP_VERNOTIF = (0, types_1.OpCodeType)('66');
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
OpCode.OP_ELSE = (0, types_1.OpCodeType)('67');
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
OpCode.OP_ENDIF = (0, types_1.OpCodeType)('68');
/**
 * Marks transaction as invalid if top stack value is not true. The top stack value is removed.
 * @name OP_VERIFY
 * @constant {OpCodeType} `OpCodeType('69')`
 */
OpCode.OP_VERIFY = (0, types_1.OpCodeType)('69');
/**
 * OP_RETURN can also be used to create "False Return" outputs with a scriptPubKey consisting of `OP_FALSE` `OP_RETURN` followed by data. Such outputs are provably unspendable and should be given a value of zero Satoshis. These outputs can be pruned from storage in the UTXO set, reducing its size. Currently the BitcoinSV network supports multiple FALSE RETURN outputs in a given transaction with each one capable of holding up to 100kB of data. After the Genesis upgrade in 2020 miners will be free to mine transactions containing FALSE RETURN outputs of any size.
 * @name OP_RETURN
 * @constant {OpCodeType} `OpCodeType('6a')`
 */
OpCode.OP_RETURN = (0, types_1.OpCodeType)('6a');
/**
 * Puts the input onto the top of the alt stack. Removes it from the main stack.
 * @name OP_TOALTSTACK
 * @constant {OpCodeType} `OpCodeType('6b')`
 */
OpCode.OP_TOALTSTACK = (0, types_1.OpCodeType)('6b');
/**
 * Puts the input onto the top of the main stack. Removes it from the alt stack.
 * @name OP_FROMALTSTACK
 * @constant {OpCodeType} `OpCodeType('6c')`
 */
OpCode.OP_FROMALTSTACK = (0, types_1.OpCodeType)('6c');
/**
 * Removes the top two stack items.
 * @name OP_2DROP
 * @constant {OpCodeType} `OpCodeType('6d')`
 */
OpCode.OP_2DROP = (0, types_1.OpCodeType)('6d');
/**
 * Duplicates the top two stack items.
 * @name OP_2DUP
 * @constant {OpCodeType} `OpCodeType('6e')`
 */
OpCode.OP_2DUP = (0, types_1.OpCodeType)('6e');
/**
 * Duplicates the top three stack items.
 * @name OP_3DUP
 * @constant {OpCodeType} `OpCodeType('6f')`
 */
OpCode.OP_3DUP = (0, types_1.OpCodeType)('6f');
/**
 * Copies the pair of items two spaces back in the stack to the front.
 * @name OP_2OVER
 * @constant {OpCodeType} `OpCodeType('70')`
 */
OpCode.OP_2OVER = (0, types_1.OpCodeType)('70');
/**
 * The fifth and sixth items back are moved to the top of the stack.
 * @name OP_2ROT
 * @constant {OpCodeType} `OpCodeType('71')`
 */
OpCode.OP_2ROT = (0, types_1.OpCodeType)('71');
/**
 * Swaps the top two pairs of items.
 * @name OP_2SWAP
 * @constant {OpCodeType} `OpCodeType('72')`
 */
OpCode.OP_2SWAP = (0, types_1.OpCodeType)('72');
/**
 * If the top stack value is not 0, duplicate it.
 * @name OP_IFDUP
 * @constant {OpCodeType} `OpCodeType('73')`
 */
OpCode.OP_IFDUP = (0, types_1.OpCodeType)('73');
/**
 * Counts the number of stack items onto the stack and places the value on the top
 * @name OP_DEPTH
 * @constant {OpCodeType} `OpCodeType('74')`
 */
OpCode.OP_DEPTH = (0, types_1.OpCodeType)('74');
/**
 * Removes the top stack item.
 * @name OP_DROP
 * @constant {OpCodeType} `OpCodeType('75')`
 */
OpCode.OP_DROP = (0, types_1.OpCodeType)('75');
/**
 * Duplicates the top stack item.
 * @name OP_DUP
 * @constant {OpCodeType} `OpCodeType('76')`
 */
OpCode.OP_DUP = (0, types_1.OpCodeType)('76');
/**
 * Removes the second-to-top stack item.
 * @name OP_NIP
 * @constant {OpCodeType} `OpCodeType('77')`
 */
OpCode.OP_NIP = (0, types_1.OpCodeType)('77');
/**
 * Copies the second-to-top stack item to the top.
 * @name OP_OVER
 * @constant {OpCodeType} `OpCodeType('78')`
 */
OpCode.OP_OVER = (0, types_1.OpCodeType)('78');
/**
 * The item `n` back in the stack is copied to the top.
 * @name OP_PICK
 * @constant {OpCodeType} `OpCodeType('79')`
 */
OpCode.OP_PICK = (0, types_1.OpCodeType)('79');
/**
 * The item `n` back in the stack is moved to the top.
 * @name OP_ROLL
 * @constant {OpCodeType} `OpCodeType('7a')`
 */
OpCode.OP_ROLL = (0, types_1.OpCodeType)('7a');
/**
 * The top three items on the stack are rotated to the left.
 * @name OP_ROT
 * @constant {OpCodeType} `OpCodeType('7b')`
 */
OpCode.OP_ROT = (0, types_1.OpCodeType)('7b');
/**
 * The top two items on the stack are swapped.
 * @name OP_SWAP
 * @constant {OpCodeType} `OpCodeType('7c')`
 */
OpCode.OP_SWAP = (0, types_1.OpCodeType)('7c');
/**
 * The item at the top of the stack is copied and inserted before the second-to-top item.
 * @name OP_TUCK
 * @constant {OpCodeType} `OpCodeType('7d')`
 */
OpCode.OP_TUCK = (0, types_1.OpCodeType)('7d');
/**
 * Concatenates two strings.
 * @name OP_CAT
 * @constant {OpCodeType} `OpCodeType('7e')`
 */
OpCode.OP_CAT = (0, types_1.OpCodeType)('7e');
/**
 * Splits byte sequence x at position n.
 * @name OP_SPLIT
 * @constant {OpCodeType} `OpCodeType('7f')`
 */
OpCode.OP_SPLIT = (0, types_1.OpCodeType)('7f'); // after monolith upgrade (May 2018)
/**
 * Converts numeric value a into byte sequence of length b.
 * @name OP_NUM2BIN
 * @constant {OpCodeType} `OpCodeType('80')`
 */
OpCode.OP_NUM2BIN = (0, types_1.OpCodeType)('80'); // after monolith upgrade (May 2018)
/**
 * Converts byte sequence x into a numeric value.
 * @name OP_BIN2NUM
 * @constant {OpCodeType} `OpCodeType('81')`
 */
OpCode.OP_BIN2NUM = (0, types_1.OpCodeType)('81'); // after monolith upgrade (May 2018)
/**
 * Pushes the string length of the top element of the stack (without popping it).
 * @name OP_SIZE
 * @constant {OpCodeType} `OpCodeType('82')`
 */
OpCode.OP_SIZE = (0, types_1.OpCodeType)('82');
/**
 * Flips all of the bits in the input.
 * @name OP_INVERT
 * @constant {OpCodeType} `OpCodeType('83')`
 */
OpCode.OP_INVERT = (0, types_1.OpCodeType)('83');
/**
 * Boolean and between each bit in the inputs.
 * @name OP_AND
 * @constant {OpCodeType} `OpCodeType('84')`
 */
OpCode.OP_AND = (0, types_1.OpCodeType)('84');
/**
 * Boolean or between each bit in the inputs.
 * @name OP_OR
 * @constant {OpCodeType} `OpCodeType('85')`
 */
OpCode.OP_OR = (0, types_1.OpCodeType)('85');
/**
 * Boolean exclusive or between each bit in the inputs.
 * @name OP_XOR
 * @constant {OpCodeType} `OpCodeType('86')`
 */
OpCode.OP_XOR = (0, types_1.OpCodeType)('86');
/**
 * Returns 1 if the inputs are exactly equal, 0 otherwise.
 * @name OP_EQUAL
 * @constant {OpCodeType} `OpCodeType('87')`
 */
OpCode.OP_EQUAL = (0, types_1.OpCodeType)('87');
/**
 * Same as `OP_EQUAL`, but runs `OP_VERIFY` afterward.
 * @name OP_EQUALVERIFY
 * @constant {OpCodeType} `OpCodeType('88')`
 */
OpCode.OP_EQUALVERIFY = (0, types_1.OpCodeType)('88');
/**
 * Any opcode not assigned is also reserved. Using an unassigned opcode makes the transaction invalid.
 * @name OP_RESERVED1
 * @constant {OpCodeType} `OpCodeType('89')`
 */
OpCode.OP_RESERVED1 = (0, types_1.OpCodeType)('89');
/**
 * Any opcode not assigned is also reserved. Using an unassigned opcode makes the transaction invalid.
 * @name OP_RESERVED2
 * @constant {OpCodeType} `OpCodeType('8a')`
 */
OpCode.OP_RESERVED2 = (0, types_1.OpCodeType)('8a');
/**
 * 1 is added to the input.
 * @name OP_1ADD
 * @constant {OpCodeType} `OpCodeType('8b')`
 */
OpCode.OP_1ADD = (0, types_1.OpCodeType)('8b');
/**
 * 1 is subtracted from the input.
 * @name OP_1SUB
 * @constant {OpCodeType} `OpCodeType('8c')`
 */
OpCode.OP_1SUB = (0, types_1.OpCodeType)('8c');
/**
 * The input is multiplied by 2. **DISABLED** now. (This opcode is scheduled to be re-enabled in the Chronicle update)
 * @name OP_2MUL
 * @constant {OpCodeType} `OpCodeType('8d')`
 */
OpCode.OP_2MUL = (0, types_1.OpCodeType)('8d');
/**
 * The input is divided by 2. **DISABLED** now. (This opcode is scheduled to be re-enabled in the Chronicle update)
 * @name OP_2DIV
 * @constant {OpCodeType} `OpCodeType('8e')`
 */
OpCode.OP_2DIV = (0, types_1.OpCodeType)('8e');
/**
 * The sign of the input is flipped.
 * @name OP_NEGATE
 * @constant {OpCodeType} `OpCodeType('8f')`
 */
OpCode.OP_NEGATE = (0, types_1.OpCodeType)('8f');
/**
 * The input is made positive.
 * @name OP_ABS
 * @constant {OpCodeType} `OpCodeType('90')`
 */
OpCode.OP_ABS = (0, types_1.OpCodeType)('90');
/**
 * If the input is 0 or 1, it is flipped. Otherwise the output will be 0.
 * @name OP_NOT
 * @constant {OpCodeType} `OpCodeType('91')`
 */
OpCode.OP_NOT = (0, types_1.OpCodeType)('91');
/**
 * Returns 0 if the input is 0. 1 otherwise.
 * @name OP_0NOTEQUAL
 * @constant {OpCodeType} `OpCodeType('92')`
 */
OpCode.OP_0NOTEQUAL = (0, types_1.OpCodeType)('92');
/**
 * a is added to b.
 * @name OP_ADD
 * @constant {OpCodeType} `OpCodeType('93')`
 */
OpCode.OP_ADD = (0, types_1.OpCodeType)('93');
/**
 * b is subtracted from a.
 * @name OP_SUB
 * @constant {OpCodeType} `OpCodeType('94')`
 */
OpCode.OP_SUB = (0, types_1.OpCodeType)('94');
/**
 * a is multiplied by b.
 * @name OP_MUL
 * @constant {OpCodeType} `OpCodeType('95')`
 */
OpCode.OP_MUL = (0, types_1.OpCodeType)('95');
/**
 * a is divided by b.
 * @name OP_DIV
 * @constant {OpCodeType} `OpCodeType('96')`
 */
OpCode.OP_DIV = (0, types_1.OpCodeType)('96');
/**
 * Returns the remainder after dividing a by b.
 * @name OP_MOD
 * @constant {OpCodeType} `OpCodeType('97')`
 */
OpCode.OP_MOD = (0, types_1.OpCodeType)('97');
/**
 * Logical left shift b bits. Sign data is discarded
 * @name OP_LSHIFT
 * @constant {OpCodeType} `OpCodeType('98')`
 */
OpCode.OP_LSHIFT = (0, types_1.OpCodeType)('98');
/**
 * Logical right shift b bits. Sign data is discarded
 * @name OP_RSHIFT
 * @constant {OpCodeType} `OpCodeType('99')`
 */
OpCode.OP_RSHIFT = (0, types_1.OpCodeType)('99');
/**
 * If both a and b are not 0, the output is 1. Otherwise 0.
 * @name OP_BOOLAND
 * @constant {OpCodeType} `OpCodeType('9a')`
 */
OpCode.OP_BOOLAND = (0, types_1.OpCodeType)('9a');
/**
 * If a or b is not 0, the output is 1. Otherwise 0.
 * @name OP_BOOLOR
 * @constant {OpCodeType} `OpCodeType('9b')`
 */
OpCode.OP_BOOLOR = (0, types_1.OpCodeType)('9b');
/**
 * Returns 1 if the numbers are equal, 0 otherwise.
 * @name OP_NUMEQUAL
 * @constant {OpCodeType} `OpCodeType('9c')`
 */
OpCode.OP_NUMEQUAL = (0, types_1.OpCodeType)('9c');
/**
 * Same as `OP_NUMEQUAL`, but runs `OP_VERIFY` afterward.
 * @name OP_NUMEQUALVERIFY
 * @constant {OpCodeType} `OpCodeType('9d')`
 */
OpCode.OP_NUMEQUALVERIFY = (0, types_1.OpCodeType)('9d');
/**
 * Returns 1 if the numbers are not equal, 0 otherwise.
 * @name OP_NUMNOTEQUAL
 * @constant {OpCodeType} `OpCodeType('9e')`
 */
OpCode.OP_NUMNOTEQUAL = (0, types_1.OpCodeType)('9e');
/**
 * Returns 1 if a is less than b, 0 otherwise.
 * @name OP_LESSTHAN
 * @constant {OpCodeType} `OpCodeType('9f')`
 */
OpCode.OP_LESSTHAN = (0, types_1.OpCodeType)('9f');
/**
 * Returns 1 if a is greater than b, 0 otherwise.
 * @name OP_GREATERTHAN
 * @constant {OpCodeType} `OpCodeType('a0')`
 */
OpCode.OP_GREATERTHAN = (0, types_1.OpCodeType)('a0');
/**
 * Returns 1 if a is less than or equal to b, 0 otherwise.
 * @name OP_LESSTHANOREQUAL
 * @constant {OpCodeType} `OpCodeType('a1')`
 */
OpCode.OP_LESSTHANOREQUAL = (0, types_1.OpCodeType)('a1');
/**
 * Returns 1 if a is greater than or equal to b, 0 otherwise.
 * @name OP_GREATERTHANOREQUAL
 * @constant {OpCodeType} `OpCodeType('a2')`
 */
OpCode.OP_GREATERTHANOREQUAL = (0, types_1.OpCodeType)('a2');
/**
 * Returns the smaller of a and b.
 * @name OP_MIN
 * @constant {OpCodeType} `OpCodeType('a3')`
 */
OpCode.OP_MIN = (0, types_1.OpCodeType)('a3');
/**
 * Returns the larger of a and b.
 * @name OP_MAX
 * @constant {OpCodeType} `OpCodeType('a4')`
 */
OpCode.OP_MAX = (0, types_1.OpCodeType)('a4');
/**
 * Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.
 * @name OP_WITHIN
 * @constant {OpCodeType} `OpCodeType('a5')`
 */
OpCode.OP_WITHIN = (0, types_1.OpCodeType)('a5');
/**
 * The input is hashed using RIPEMD-160.
 * @name OP_RIPEMD160
 * @constant {OpCodeType} `OpCodeType('a6')`
 */
OpCode.OP_RIPEMD160 = (0, types_1.OpCodeType)('a6');
/**
 * The input is hashed using SHA-1.
 * @name OP_SHA1
 * @constant {OpCodeType} `OpCodeType('a7')`
 */
OpCode.OP_SHA1 = (0, types_1.OpCodeType)('a7');
/**
 * The input is hashed using SHA-256.
 * @name OP_SHA256
 * @constant {OpCodeType} `OpCodeType('a8')`
 */
OpCode.OP_SHA256 = (0, types_1.OpCodeType)('a8');
/**
 * The input is hashed twice: first with SHA-256 and then with RIPEMD-160.
 * @name OP_HASH160
 * @constant {OpCodeType} `OpCodeType('a9')`
 */
OpCode.OP_HASH160 = (0, types_1.OpCodeType)('a9');
/**
 * The input is hashed two times with SHA-256.
 * @name OP_HASH256
 * @constant {OpCodeType} `OpCodeType('aa')`
 */
OpCode.OP_HASH256 = (0, types_1.OpCodeType)('aa');
/**
 * All of the signature checking words will only match signatures to the data after the most recently-executed
 * [OP_CODESEPARATOR]{@link https://wiki.bitcoinsv.io/index.php/OP_CODESEPARATOR}.
 * @name OP_CODESEPARATOR
 * @constant {OpCodeType} `OpCodeType('ab')`
 */
OpCode.OP_CODESEPARATOR = (0, types_1.OpCodeType)('ab');
/**
 * The entire transaction's outputs, inputs, and script (from the most recently-executed [OP_CODESEPARATOR]{@link https://wiki.bitcoinsv.io/index.php/OP_CODESEPARATOR} to the end) are hashed.
 * The signature used by [OP_CHECKSIG]{@link https://wiki.bitcoinsv.io/index.php/OP_CHECKSIG} must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.
 * @name OP_CHECKSIG
 * @constant {OpCodeType} `OpCodeType('ac')`
 */
OpCode.OP_CHECKSIG = (0, types_1.OpCodeType)('ac');
/**
 * Same as `OP_CHECKSIG`, but `OP_VERIFY` is executed afterward.
 * @name OP_CHECKSIGVERIFY
 * @constant {OpCodeType} `OpCodeType('ad')`
 */
OpCode.OP_CHECKSIGVERIFY = (0, types_1.OpCodeType)('ad');
/**
 * 	Compares the first signature against each public key until it finds an ECDSA match. Starting with the subsequent public key, it compares the second signature against each remaining public key until it finds an ECDSA match. The process is repeated until all signatures have been checked or not enough public keys remain to produce a successful result. All signatures need to match a public key. Because public keys are not checked again if they fail any signature comparison, signatures must be placed in the scriptSig using the same order as their corresponding public keys were placed in the scriptPubKey or redeemScript. If all signatures are valid, 1 is returned, 0 otherwise. Due to a bug, an extra unused value (x) is removed from the stack. Script spenders must account for this by adding a junk value (typically zero) to the stack.
 * @name OP_CHECKMULTISIG
 * @constant {OpCodeType} `OpCodeType('ae')`
 */
OpCode.OP_CHECKMULTISIG = (0, types_1.OpCodeType)('ae');
/**
 * Same as `OP_CHECKMULTISIG`, but `OP_VERIFY` is executed afterward.
 * @name OP_CHECKMULTISIGVERIFY
 * @constant {OpCodeType} `OpCodeType('af')`
 */
OpCode.OP_CHECKMULTISIGVERIFY = (0, types_1.OpCodeType)('af');
/**
 * No operation. The word is ignored.
 * @name OP_NOP1
 * @constant {OpCodeType} `OpCodeType('b0')`
 */
OpCode.OP_NOP1 = (0, types_1.OpCodeType)('b0');
/**
 * No operation. The word is ignored. (previously OP_CHECKLOCKTIMEVERIFY)
 * @name OP_NOP2
 * @constant {OpCodeType} `OpCodeType('b1')`
 */
OpCode.OP_NOP2 = (0, types_1.OpCodeType)('b1'); // previously OP_CHECKLOCKTIMEVERIFY
/**
 * No operation. The word is ignored. (previously OP_CHECKSEQUENCEVERIFY)
 * @name OP_NOP3
 * @constant {OpCodeType} `OpCodeType('b2')`
 */
OpCode.OP_NOP3 = (0, types_1.OpCodeType)('b2');
/**
 * No operation. The word is ignored.
 * @name OP_NOP4
 * @constant {OpCodeType} `OpCodeType('b3')`
 */
OpCode.OP_NOP4 = (0, types_1.OpCodeType)('b3');
/**
 * No operation. The word is ignored.
 * @name OP_NOP5
 * @constant {OpCodeType} `OpCodeType('b4')`
 */
OpCode.OP_NOP5 = (0, types_1.OpCodeType)('b4');
/**
 * No operation. The word is ignored.
 * @name OP_NOP6
 * @constant {OpCodeType} `OpCodeType('b5')`
 */
OpCode.OP_NOP6 = (0, types_1.OpCodeType)('b5');
/**
 * No operation. The word is ignored.
 * @name OP_NOP7
 * @constant {OpCodeType} `OpCodeType('b6')`
 */
OpCode.OP_NOP7 = (0, types_1.OpCodeType)('b6');
/**
 * No operation. The word is ignored.
 * @name OP_NOP8
 * @constant {OpCodeType} `OpCodeType('b7')`
 */
OpCode.OP_NOP8 = (0, types_1.OpCodeType)('b7');
/**
 * No operation. The word is ignored.
 * @name OP_NOP9
 * @constant {OpCodeType} `OpCodeType('b8')`
 */
OpCode.OP_NOP9 = (0, types_1.OpCodeType)('b8');
/**
 * No operation. The word is ignored.
 * @name OP_NOP10
 * @constant {OpCodeType} `OpCodeType('b9')`
 */
OpCode.OP_NOP10 = (0, types_1.OpCodeType)('b9');
// The first static const OpCodeType OP_code value after all defined opcodes
//FIRST_UNDEFINED_OP_VALUE
// template matching params
/**
 * Represents a public key hashed with OP_HASH160. The word is used internally for assisting with transaction matching. They are invalid if used in actual scripts.
 * @name OP_PUBKEYHASH
 * @constant {OpCodeType} `OpCodeType('fd')`
 */
OpCode.OP_PUBKEYHASH = (0, types_1.OpCodeType)('fd');
/**
 * Represents a public key compatible with OP_CHECKSIG. The word is used internally for assisting with transaction matching. They are invalid if used in actual scripts.
 * @name OP_PUBKEY
 * @constant {OpCodeType} `OpCodeType('fe')`
 */
OpCode.OP_PUBKEY = (0, types_1.OpCodeType)('fe');
/**
 * Matches any opcode that is not yet assigned. The word is used internally for assisting with transaction matching. They are invalid if used in actual scripts.
 * @name OP_PUBKEY
 * @constant {OpCodeType} `OpCodeType('ff')`
 */
OpCode.OP_INVALIDOPCODE = (0, types_1.OpCodeType)('ff');
/**
 * The Utils library provides a set of commonly used utility functions.
 * @category Standard Contracts
 */
class Utils {
    /**
     * convert signed integer `n` to unsigned integer of `l` string, in little endian
     * @param {bigint} n the number to be converted
     * @param {bigint} l expected length
     * @returns {ByteString} returns a `ByteString`
     */
    static toLEUnsigned(n, l) {
        let m = int2ByteString(n, l + (0, scryptlib_1.Int)(1));
        // remove sign byte
        return m.slice(0, Number(len(m)) * 2 - 2);
    }
    /**
     * convert `ByteString` to unsigned integer, in sign-magnitude little endian
     * @param {ByteString} bytes the `ByteString` to be converted
     * @returns {bigint} returns a number
     */
    static fromLEUnsigned(bytes) {
        return byteString2Int(bytes + (0, types_1.toByteString)('00'));
    }
    /**
     * read [VarInt (variable integer)]{@link https://learnmeabitcoin.com/technical/general/compact-size/}-encoded data from the beginning of 'buf'
     * @param {ByteString} buf a buffer `ByteString` of format: [prefix FD/FE/FF +] length + data
     * @returns return data
     */
    static readVarint(buf) {
        let l = (0, scryptlib_1.Int)(0);
        let ret = (0, types_1.toByteString)('');
        let header = buf.slice(0, 2);
        if (header == (0, types_1.toByteString)('fd')) {
            l = Utils.fromLEUnsigned(buf.slice(2, 6));
            ret = buf.slice(6, 6 + Number(l * (0, scryptlib_1.Int)(2)));
        }
        else if (header == (0, types_1.toByteString)('fe')) {
            l = Utils.fromLEUnsigned(buf.slice(2, 10));
            ret = buf.slice(10, 10 + Number(l * (0, scryptlib_1.Int)(2)));
        }
        else if (header == (0, types_1.toByteString)('ff')) {
            l = Utils.fromLEUnsigned(buf.slice(2, 18));
            ret = buf.slice(18, 18 + Number(l * (0, scryptlib_1.Int)(2)));
        }
        else {
            l = Utils.fromLEUnsigned(buf.slice(0, 2));
            ret = buf.slice(2, 2 + Number(l * (0, scryptlib_1.Int)(2)));
        }
        return ret;
    }
    /**
     * encode data in 'buf' to a [VarInt (variable integer)]{@link https://learnmeabitcoin.com/technical/general/compact-size/} format; opposite of readVarint
     * @param {ByteString} buf a buffer `ByteString` containing the data
     * @returns return format: [prefix FD/FE/FF +] length + data
     */
    static writeVarint(buf) {
        let n = len(buf);
        let header = (0, types_1.toByteString)('');
        if (n < 0xfd) {
            header = Utils.toLEUnsigned((0, scryptlib_1.Int)(n), (0, scryptlib_1.Int)(1));
        }
        else if (n < 0x10000) {
            header = (0, types_1.toByteString)('fd') + Utils.toLEUnsigned((0, scryptlib_1.Int)(n), (0, scryptlib_1.Int)(2));
        }
        else if (n < 0x100000000) {
            header = (0, types_1.toByteString)('fe') + Utils.toLEUnsigned((0, scryptlib_1.Int)(n), (0, scryptlib_1.Int)(4));
        }
        else if (n < 0x10000000000000000) {
            header = (0, types_1.toByteString)('ff') + Utils.toLEUnsigned((0, scryptlib_1.Int)(n), (0, scryptlib_1.Int)(8));
        }
        return header + buf;
    }
    /**
     * build a tx output from its script and satoshi amount
     * @param {ByteString} outputScript the locking script
     * @param {bigint} outputSatoshis the satoshi amount
     * @returns {ByteString} a `ByteString` that represents an output
     */
    static buildOutput(outputScript, outputSatoshis) {
        return int2ByteString(outputSatoshis, Constants.OutputValueLen) + Utils.writeVarint(outputScript);
    }
    /**
     * constructs a P2PKH script from a given PubKeyHash
     * @param {PubKeyHash} pubKeyHash - the recipient's public key hash
     * @returns {ByteString} a `ByteString` representing the P2PKH script
     */
    static buildPublicKeyHashScript(pubKeyHash) {
        return (0, types_1.toByteString)(OpCode.OP_DUP) + (0, types_1.toByteString)(OpCode.OP_HASH160) + int2ByteString(Constants.PubKeyHashLen /* "OP_PUSHDATA0" */)
            + pubKeyHash + (0, types_1.toByteString)(OpCode.OP_EQUALVERIFY) + (0, types_1.toByteString)(OpCode.OP_CHECKSIG);
    }
    /**
     * constructs a P2PKH output from a given PubKeyHash and satoshi amount
     * @param {PubKeyHash} pubKeyHash - the recipient's public key hash
     * @param {bigint} amount - the satoshi amount
     * @returns {ByteString} a `ByteString` representing the P2PKH output
     */
    static buildPublicKeyHashOutput(pubKeyHash, amount) {
        return Utils.buildOutput(Utils.buildPublicKeyHashScript(pubKeyHash), amount);
    }
    /**
     * constructs a standard payment (P2PKH) script from a given address
     * @param {Addr} addr - the recipient's address
     * @returns {ByteString} a `ByteString` representing the P2PKH script
     */
    static buildAddressScript(addr) {
        return Utils.buildPublicKeyHashScript(addr);
    }
    /**
     * constructs a standard payment (P2PKH) output from a given address and satoshi amount
     * @param {Addr} addr - the recipient's address
     * @param {bigint} amount - the satoshi amount
     * @returns {ByteString} a `ByteString` representing the P2PKH output
     */
    static buildAddressOutput(addr, amount) {
        return Utils.buildPublicKeyHashOutput(addr, amount);
    }
    /**
     * build `OP_FALSE OP_RETURN` script from data payload
     * @param {ByteString} data the data payload
     * @returns {ByteString} a ByteString contains the data payload
     */
    static buildOpreturnScript(data) {
        return (0, types_1.toByteString)(OpCode.OP_FALSE) + (0, types_1.toByteString)(OpCode.OP_RETURN) + Utils.writeVarint(data);
    }
}
exports.Utils = Utils;
/** number of string to denote output value  */
Utils.OutputValueLen = (0, scryptlib_1.Int)(8);
/** number of string to denote a public key hash */
Utils.PubKeyHashLen = (0, scryptlib_1.Int)(20);
/**
 * A library to access various fields in the [preimage]{@link https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/abc/replay-protected-sighash.md}.
 * For example, we usually use `SigHash.scriptCode(preimage: SigHashPreimage)` to access the scriptCode of the preimage,
 * and use `SigHash.value(preimage: SigHashPreimage)` to access the value field of the preimage, which is the value of the number of bitcoins spent in this contract.
 * @category Standard Contracts
 */
class SigHash {
    /**
     * get version of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return version `ByteString` in 4-byte little endian
     */
    static nVersion(preimage) {
        return (0, types_1.toByteString)(preimage).slice(0, 8);
    }
    /**
     * get hashPrevouts of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return hashPrevouts `ByteString` in 32-byte little endian
     */
    static hashPrevouts(preimage) {
        return (0, types_1.toByteString)(preimage).slice(8, 72);
    }
    /**
     * get hashSequence of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return hashSequence `ByteString` in 32-byte little endian
     */
    static hashSequence(preimage) {
        return (0, types_1.toByteString)(preimage).slice(36 * 2, 68 * 2);
    }
    /**
     * get outpoint of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return outpoint `ByteString` in 32-byte hash + 4-byte little endian
     */
    static outpoint(preimage) {
        return (0, types_1.toByteString)(preimage).slice(68 * 2, 104 * 2);
    }
    /**
     * get scriptCode of the transaction from the preimage. scriptCode is just scriptPubKey if there is no CODESEPARATOR in the latter
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return scriptCode `ByteString`
     */
    static scriptCode(preimage) {
        return Utils.readVarint((0, types_1.toByteString)(preimage).slice(104 * 2));
    }
    /**
     * get value of the output spent by this input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return value `ByteString` in 8-byte little endian
     */
    static valueRaw(preimage) {
        let l = Number(len((0, types_1.toByteString)(preimage)));
        return (0, types_1.toByteString)(preimage).slice(l * 2 - 104, l * 2 - 88);
    }
    /**
     * get value of the output spent by this input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {bigint} return value
     */
    static value(preimage) {
        return Utils.fromLEUnsigned(SigHash.valueRaw(preimage));
    }
    /**
     * nSequence of the input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return nSequence `ByteString` in 4-byte little endian
     */
    static nSequenceRaw(preimage) {
        let l = Number(len((0, types_1.toByteString)(preimage)));
        return (0, types_1.toByteString)(preimage).slice(l * 2 - 88, l * 2 - 80);
    }
    /**
     * nSequence of the input from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {bigint} return nSequence
     */
    static nSequence(preimage) {
        return Utils.fromLEUnsigned(SigHash.nSequenceRaw(preimage));
    }
    ;
    /**
     * get hashOutputs of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return hashOutputs `ByteString` in 32-byte hash
     */
    static hashOutputs(preimage) {
        let l = Number(len((0, types_1.toByteString)(preimage)));
        return (0, types_1.toByteString)(preimage).slice(l * 2 - 80, l * 2 - 16);
    }
    /**
     * get nLocktime of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {ByteString} return nLocktime `ByteString` in 4-byte little endian
     */
    static nLocktimeRaw(preimage) {
        let l = Number(len((0, types_1.toByteString)(preimage)));
        return (0, types_1.toByteString)(preimage).slice(l * 2 - 16, l * 2 - 8);
    }
    /**
     * get nLocktime of the transaction from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {bigint} return nLocktime
     */
    static nLocktime(preimage) {
        return Utils.fromLEUnsigned(SigHash.nLocktimeRaw(preimage));
    }
    ;
    /**
     * sighash type of the signature from the preimage
     * @param {SigHashPreimage} preimage the preimage
     * @returns {SigHashType} return sighash type
     */
    static sigHashType(preimage) {
        let l = Number(len((0, types_1.toByteString)(preimage)));
        let sigHashType = Utils.fromLEUnsigned((0, types_1.toByteString)(preimage).slice(l * 2 - 8, l * 2 - 6));
        return (0, scryptlib_1.SigHashType)(Number(sigHashType));
    }
}
exports.SigHash = SigHash;
SigHash.ALL = (0, scryptlib_1.SigHashType)(65);
SigHash.NONE = (0, scryptlib_1.SigHashType)(66);
SigHash.SINGLE = (0, scryptlib_1.SigHashType)(67);
SigHash.ANYONECANPAY_ALL = (0, scryptlib_1.SigHashType)(193);
SigHash.ANYONECANPAY_NONE = (0, scryptlib_1.SigHashType)(194);
SigHash.ANYONECANPAY_SINGLE = (0, scryptlib_1.SigHashType)(195);
/**
 * A reader to parse a ByteString buffer
 * @category Standard Contracts
 */
class VarIntReader {
    constructor(buf) {
        this.buf = buf;
        this.pos = (0, scryptlib_1.Int)(0);
    }
    /**
     * Check if all have been read
     * @returns true if all have been read
     */
    eof() {
        return this.pos >= len(this.buf);
    }
    /**
     * read bytes which encoded with bitcoin [value-pushing words]{@link https://wiki.bitcoinsv.io/index.php/Opcodes_used_in_Bitcoin_Script}
     * @returns true if all have been read
     */
    readBytes() {
        let l = (0, scryptlib_1.Int)(0);
        let buf = this.buf;
        let ret = (0, types_1.toByteString)('');
        let header = byteString2Int(buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + (0, scryptlib_1.Int)(1)) * (0, scryptlib_1.Int)(2))));
        this.pos++;
        if (header < (0, scryptlib_1.Int)(0x4c)) {
            l = header;
            ret = buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + l) * (0, scryptlib_1.Int)(2)));
        }
        else if (header == (0, scryptlib_1.Int)(0x4c)) {
            l = Utils.fromLEUnsigned(buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + (0, scryptlib_1.Int)(1)) * (0, scryptlib_1.Int)(2))));
            this.pos += (0, scryptlib_1.Int)(1);
            ret = buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + l) * (0, scryptlib_1.Int)(2)));
        }
        else if (header == (0, scryptlib_1.Int)(0x4d)) {
            l = Utils.fromLEUnsigned(buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + (0, scryptlib_1.Int)(2)) * (0, scryptlib_1.Int)(2))));
            this.pos += (0, scryptlib_1.Int)(2);
            ret = buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + l) * (0, scryptlib_1.Int)(2)));
        }
        else if (header == (0, scryptlib_1.Int)(0x4e)) {
            l = Utils.fromLEUnsigned(buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + (0, scryptlib_1.Int)(4)) * (0, scryptlib_1.Int)(2))));
            this.pos += (0, scryptlib_1.Int)(4);
            ret = buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + l) * (0, scryptlib_1.Int)(2)));
        }
        else {
            // shall not reach here
            assert(false);
        }
        this.pos += l;
        return ret;
    }
    /**
     * read a byte as boolean
     * @returns true if the read byte not equal to '00'
     */
    readBool() {
        let buf = this.buf.slice(Number(this.pos * (0, scryptlib_1.Int)(2)), Number((this.pos + (0, scryptlib_1.Int)(1)) * (0, scryptlib_1.Int)(2)));
        this.pos++;
        return (0, types_1.toByteString)('00') != buf;
    }
    /**
     * read bytes as `readBytes` and convert it to a number with `byteString2Int`
     * @returns a number
     */
    readInt() {
        return byteString2Int(this.readBytes());
    }
    /**
     * @ignore
     * @param scriptCode the scriptCode of the preimage
     * @returns a offset in the scriptCode ByteString
     */
    static getStateStart(scriptCode) {
        // locking script: code + opreturn + data(state + state_len + version)
        let scriptLen = BigInt(len(scriptCode));
        // read state length
        let start = scriptLen - VarIntReader.StateLen - VarIntReader.VersionLen;
        let end = scriptLen - VarIntReader.VersionLen;
        let lb = scriptCode.slice(Number(start * (0, scryptlib_1.Int)(2)), Number(end * (0, scryptlib_1.Int)(2)));
        let stateLen = byteString2Int(lb);
        // TODO: check version is as expected
        return scriptLen - stateLen - VarIntReader.StateLen - VarIntReader.VersionLen;
    }
}
exports.VarIntReader = VarIntReader;
// fixed number of string to denote length of serialized state
VarIntReader.StateLen = (0, scryptlib_1.Int)(4);
// fixed number of string to denote version
VarIntReader.VersionLen = (0, scryptlib_1.Int)(1);
// version
VarIntReader.Version = (0, scryptlib_1.Int)(0);
/**
 * A writer that serializes `ByteString`, `boolean`, `bigint`
 * @category Standard Contracts
 */
class VarIntWriter {
    /**
     * serializes `ByteString` with `VarInt` encoding
     * @param buf a `ByteString`
     * @returns serialized `ByteString`
     */
    static writeBytes(buf) {
        let n = BigInt(len(buf));
        let header = (0, types_1.toByteString)('');
        if (n < 0x4c) {
            header = Utils.toLEUnsigned(n, (0, scryptlib_1.Int)(1));
        }
        else if (n < 0x100) {
            header = (0, types_1.toByteString)('4c') + Utils.toLEUnsigned(n, (0, scryptlib_1.Int)(1));
        }
        else if (n < 0x10000) {
            header = (0, types_1.toByteString)('4d') + Utils.toLEUnsigned(n, (0, scryptlib_1.Int)(2));
        }
        else if (n < 0x100000000) {
            header = (0, types_1.toByteString)('4e') + Utils.toLEUnsigned(n, (0, scryptlib_1.Int)(4));
        }
        else {
            // shall not reach here
            assert(false);
        }
        return header + buf;
    }
    /**
     * serializes `boolean` with fixed 1 byte
     * @param x a boolean
     * @returns serialized `ByteString`
     */
    static writeBool(x) {
        return x ? (0, types_1.toByteString)('01') : (0, types_1.toByteString)('00');
    }
    /**
     * serializes `bigint` with `VarInt` encoding
     * @param x a boolean
     * @returns serialized `ByteString`
     */
    static writeInt(x) {
        return VarIntWriter.writeBytes(x == (0, scryptlib_1.Int)(0) ? (0, types_1.toByteString)('00') : int2ByteString(x));
    }
    /**
     * @ignore
     * @param stateBuf
     * @returns serialized `ByteString` contains state of the contract
     */
    static serializeState(stateBuf) {
        // locking script: code + opreturn + data(state + state_len + version)
        let lenBuf = int2ByteString(BigInt(len(stateBuf)), VarIntReader.StateLen);
        return stateBuf + lenBuf + int2ByteString(VarIntReader.Version, VarIntReader.VersionLen);
    }
}
exports.VarIntWriter = VarIntWriter;
/**
 * library to access current tx
 * @ignore
 * @class
 * @category Standard Contracts
 */
class Tx {
    static normalize(k, modulus) {
        let res = k % modulus;
        // ensure it's positive
        return (res < 0) ? res + modulus : res;
    }
    static sign(h, privKey, inverseK, r, rBigEndian, sigHashType) {
        // TODO: r * privKey can also be precomputed
        let s = inverseK * (h + r * privKey);
        let N = (0, scryptlib_1.Int)('0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141');
        s = Tx.normalize(s, N);
        // lower S
        if (s > N / (0, scryptlib_1.Int)(2)) {
            s = N - s;
        }
        // require(s != 0);		// check offchain
        /*
        * DER: h + l + rh + rl + r + sh + sl + s + hashtype
        * note: r & s are at most 33 bytes, thus no need to convert endian of rl & sl
        */
        let rlen = BigInt(len(rBigEndian));
        let slen = Number(len(int2ByteString(s)));
        // we convert s to 32 bytes, otherwise reverseByteString(, 32) fails when s is strictly less than 31 bytes (note: 31 bytes works)
        // slice it after reversing to remove extra leading zeros, otherwise strict DER rule fails it due to not minimally encoded
        let sBigEndian = reverseByteString(int2ByteString(s, BigInt(32)), BigInt(32)).slice((32) * 2 - slen * 2);
        let l = (0, scryptlib_1.Int)(4) + rlen + BigInt(slen);
        // rBigEndian must be mininally encoded, to conform to strict DER rule
        let rb = (0, types_1.toByteString)('30') + int2ByteString(l) + (0, types_1.toByteString)('02') + int2ByteString(rlen) + rBigEndian + (0, types_1.toByteString)('02') + int2ByteString(BigInt(slen)) + sBigEndian + (0, types_1.toByteString)(sigHashType);
        return (0, types_1.Sig)(rb);
    }
    static fromBEUnsigned(bytes) {
        // change endian first
        // append positive sign byte. This does not hurt even when sign bit is already positive
        return byteString2Int(reverseByteString(bytes, BigInt(32)) + (0, types_1.toByteString)('00'));
    }
    // optimal pushtx
    static checkPreimageOpt(txPreimage) { throw new Error('unimplemented'); }
    // customize sigHashType
    static checkPreimageOpt_(txPreimage) { throw new Error('unimplemented'); }
    static checkPreimageAdvancedOCS(txPreimage, privKey, pubKey, inverseK, r, rBigEndian, sigHashType) { throw new Error('unimplemented'); }
    static checkPreimageOCS(txPreimage) { throw new Error('unimplemented'); }
    static checkPreimageSigHashTypeOCS(txPreimage, sigHashType) { throw new Error('unimplemented'); }
    // optimal pushtx
    static checkPreimageOptOCS(txPreimage) { throw new Error('unimplemented'); }
    // customize sigHashType
    static checkPreimageOptOCS_(txPreimage) { throw new Error('unimplemented'); }
    // return whether is the first call of series public function calls in stateful contract
    static isFirstCall(txPreimage) {
        let scriptCode = SigHash.scriptCode(txPreimage);
        let stateStart = VarIntReader.getStateStart(scriptCode);
        let reader = new VarIntReader(scriptCode.slice(Number(stateStart) * 2));
        return reader.readBool();
    }
}
exports.Tx = Tx;
// The following arguments can be generated using sample code at
// https://gist.github.com/scrypt-sv/f6882be580780a88984cee75dd1564c4.js
Tx.privKey = (0, types_1.PrivKey)((0, scryptlib_1.Int)("0x26f00fe2340a84335ebdf30f57e9bb58487117b29355718f5e46bf5168d7df97"));
Tx.pubKey = (0, types_1.PubKey)('02ba79df5f8ae7604a9830f03c7933028186aede0675a16f025dc4f8be8eec0382');
// invK is the modular inverse of k, the ephemeral key
Tx.invK = (0, scryptlib_1.Int)('0xc8ffdbaa05d93aa4ede79ec58f06a72562048b775a3507c2bf44bde4f007c40a');
// r is x coordinate of R, which is kG
Tx.r = (0, scryptlib_1.Int)('0x1008ce7480da41702918d1ec8e6849ba32b4d65b1e40dc669c31a1e6306b266c');
// rBigEndian is the signed magnitude representation of r, in big endian
Tx.rBigEndian = (0, types_1.toByteString)('1008ce7480da41702918d1ec8e6849ba32b4d65b1e40dc669c31a1e6306b266c');
/**
 * A library than contains some commonly used constant values
 * @category Standard Contracts
 */
class Constants {
}
exports.Constants = Constants;
/** length of `ByteString` to denote input sequence */
Constants.InputSeqLen = (0, scryptlib_1.Int)(4);
/** length of `ByteString` to denote output value */
Constants.OutputValueLen = (0, scryptlib_1.Int)(8);
/** length of `ByteString` to denote a public key (compressed) */
Constants.PubKeyLen = (0, scryptlib_1.Int)(33);
/** length of `ByteString` to denote a public key hash */
Constants.PubKeyHashLen = (0, scryptlib_1.Int)(20);
/** length of `ByteString` to denote a tx id */
Constants.TxIdLen = (0, scryptlib_1.Int)(32);
/** length of `ByteString` to denote a outpoint */
Constants.OutpointLen = (0, scryptlib_1.Int)(36);
//# sourceMappingURL=functions.js.map