import { SmartContractLib, FixedArray } from 'scrypt-ts';
export declare class Shift10 extends SmartContractLib {
    static readonly i1: bigint;
    static readonly i2: bigint;
    static readonly i3: bigint;
    static readonly i4: bigint;
    static readonly i5: bigint;
    static readonly arr0: FixedArray<bigint, 10>;
    static readonly i1_1: bigint;
    static readonly i2_1: bigint;
    static readonly i3_1: bigint;
    static readonly i4_1: bigint;
    static readonly i5_1: bigint;
    static readonly arr1: FixedArray<bigint, 10>;
    static readonly i1_2: bigint;
    static readonly i2_2: bigint;
    static readonly i3_2: bigint;
    static readonly i4_2: bigint;
    static readonly i5_2: bigint;
    static readonly arr2: FixedArray<bigint, 10>;
    static pow(n: bigint): bigint;
    static left(x: bigint, n: bigint): bigint;
    static right(x: bigint, n: bigint): bigint;
}
