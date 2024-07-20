import { FixedArray, SmartContractLib } from 'scrypt-ts';
export declare class Mimc7 extends SmartContractLib {
    static readonly ROUNDS = 91;
    static readonly SNARK_SCALAR_FIELD: bigint;
    static readonly CONSTS: FixedArray<bigint, typeof Mimc7.ROUNDS>;
    static hash(x: bigint, k: bigint): bigint;
}
