"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equals = exports.toByteString = exports.Sha256 = exports.Sha1 = exports.Addr = exports.PubKeyHash = exports.Ripemd160 = exports.Sig = exports.PubKey = exports.SigHashType = exports.OpCodeType = exports.PrivKey = exports.SigHashPreimage = exports.HashedSet = exports.HashedMap = exports.instanceOfSIATraceable = void 0;
const scryptlib_1 = require("scryptlib");
const scryptlib_2 = require("scryptlib");
Object.defineProperty(exports, "SigHashPreimage", { enumerable: true, get: function () { return scryptlib_2.SigHashPreimage; } });
Object.defineProperty(exports, "PrivKey", { enumerable: true, get: function () { return scryptlib_2.PrivKey; } });
Object.defineProperty(exports, "OpCodeType", { enumerable: true, get: function () { return scryptlib_2.OpCodeType; } });
Object.defineProperty(exports, "SigHashType", { enumerable: true, get: function () { return scryptlib_2.SigHashType; } });
var sorted_item_1 = require("./sorted-item");
Object.defineProperty(exports, "instanceOfSIATraceable", { enumerable: true, get: function () { return sorted_item_1.instanceOfSIATraceable; } });
var hashed_map_1 = require("./hashed-map");
Object.defineProperty(exports, "HashedMap", { enumerable: true, get: function () { return hashed_map_1.HashedMap; } });
var hashed_set_1 = require("./hashed-set");
Object.defineProperty(exports, "HashedSet", { enumerable: true, get: function () { return hashed_set_1.HashedSet; } });
/**
 * Creates a `PubKey` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific public key representation.
 */
function PubKey(b) {
    return (0, scryptlib_2.PubKey)(b);
}
exports.PubKey = PubKey;
/**
 * Creates a `Sig` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific digital signature representation.
 */
function Sig(b) {
    return (0, scryptlib_2.Sig)(b);
}
exports.Sig = Sig;
/**
 * Creates a `Ripemd160` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific RIPEMD-160 hash representation.
 */
function Ripemd160(b) {
    return (0, scryptlib_2.Ripemd160)(b);
}
exports.Ripemd160 = Ripemd160;
/**
 * Creates a `PubKeyHash` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific address representation.
 */
function PubKeyHash(b) {
    return (0, scryptlib_2.PubKeyHash)(b);
}
exports.PubKeyHash = PubKeyHash;
/**
 * Creates an `Addr` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific address representation.
 */
function Addr(b) {
    return (0, scryptlib_2.PubKeyHash)(b);
}
exports.Addr = Addr;
/**
 * Creates a `Sha1` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific SHA-1 hash representation.
 */
function Sha1(b) {
    return (0, scryptlib_2.Sha1)(b);
}
exports.Sha1 = Sha1;
/**
 * Creates a `Sha256` instance from a `ByteString`.
 * @param b - Input ByteString.
 * @returns - A domain specific SHA-256 hash representation.
 */
function Sha256(b) {
    return (0, scryptlib_2.Sha256)(b);
}
exports.Sha256 = Sha256;
/**
 * Converts a literal to ByteString.
 * If not passing `isUtf8` or `isUtf8` is false, then `literal` should be in the format of hex literal, i.e. `/^([0-9a-fA-F]{2})*$/`
 * Otherwise, `literal` should be in the format of utf8 literal, i.e. `hello world`
 * @param {string} literal literal string, can be hex literal or utf8 literal, depends on the `isUtf8` marker
 * @param {boolean} isUtf8 marker indicating whether `literal` is utf8 or hex
 */
function toByteString(literal, isUtf8 = false) {
    if (isUtf8 === true) {
        return (0, scryptlib_1.stringToBytes)(literal);
    }
    if (literal.length % 2 !== 0) {
        throw new Error('hex literal length must be even');
    }
    return literal;
}
exports.toByteString = toByteString;
function equalsArray(a, b) {
    if (Array.isArray(a[0])) {
        let results = [];
        for (let i = 0; i < a.length; i++) {
            results.push(equals(a[i], b[i]));
        }
        for (let i = 0; i < results.length; i++) {
            if (!results[i]) {
                return false;
            }
        }
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (!equals(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
function equalsStruct(a, b) {
    let akeys = Object.keys(a);
    let bkeys = Object.keys(b);
    if (akeys.length !== bkeys.length) {
        return false;
    }
    let results = [];
    for (let i = 0; i < akeys.length; i++) {
        results.push(equals(a[akeys[i]], b[bkeys[i]]));
    }
    for (let i = 0; i < results.length; i++) {
        if (!results[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Comparing two struct/FixedArray
 * @returns {boolean} returns true if equal; otherwise returns false
 * @category Global Function
 */
function equals(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return equalsArray(a, b);
    }
    if (typeof a === 'object' && typeof b === 'object') {
        return equalsStruct(a, b);
    }
    return a === b;
}
exports.equals = equals;
;
//# sourceMappingURL=types.js.map