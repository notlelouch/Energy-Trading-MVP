import { SmartContractLib, FixedArray, PubKey, ByteString } from 'scrypt-ts';
import { Point, Signature } from './misc';
export declare class SECP256R1 extends SmartContractLib {
    static readonly CURVE_BITS = 256;
    static readonly a: bigint;
    static readonly b: bigint;
    static readonly G: Point;
    static readonly n: bigint;
    static readonly P: bigint;
    static readonly UB = 368;
    static readonly DOUBLINGS_G: FixedArray<Point, 256>;
    static comparePoints(p: Point, q: Point): boolean;
    static modReduce(x: bigint, modulus: bigint): bigint;
    static modInverseBranchlessP(x: bigint): bigint;
    static modInverseBranchlessN(x: bigint): bigint;
    static modInverseEGCD(x: bigint, m: bigint): bigint;
    static negatePoint(p: Point): Point;
    static doublePoint(p: Point): Point;
    static addPoints(p: Point, q: Point): Point;
    static mulByScalar(p: Point, m: bigint): Point;
    static mulGeneratorByScalar(m: bigint): Point;
    static pubKey2Point(pubKey: PubKey): Point;
    static point2PubKey(point: Point): PubKey;
    static toBEUnsigned32(n: bigint): ByteString;
    static verifySig(hashInt: bigint, sig: Signature, pubKey: Point): boolean;
}
