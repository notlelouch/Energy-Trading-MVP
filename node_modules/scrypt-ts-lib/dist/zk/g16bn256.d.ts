import { SmartContractLib, FixedArray } from 'scrypt-ts';
import { FQ12, G2Point, G1Point } from '../ec/bn256';
export type VerifyingKey = {
    millerb1a1: FQ12;
    gamma: G2Point;
    delta: G2Point;
    gammaAbc: FixedArray<G1Point, 2>;
};
export type Proof = {
    a: G1Point;
    b: G2Point;
    c: G1Point;
};
export declare class G16BN256 extends SmartContractLib {
    static readonly N = 1;
    static verify(inputs: FixedArray<bigint, typeof G16BN256.N>, proof: Proof, vk: VerifyingKey): boolean;
}
