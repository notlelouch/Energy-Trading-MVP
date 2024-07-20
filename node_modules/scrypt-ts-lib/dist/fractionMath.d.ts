import { SmartContractLib } from 'scrypt-ts';
export type Fraction = {
    n: bigint;
    d: bigint;
};
export declare class FRMath extends SmartContractLib {
    static add(x: Fraction, y: Fraction): Fraction;
    static sAdd(x: Fraction, y: Fraction): Fraction;
    static sub(x: Fraction, y: Fraction): Fraction;
    static sSub(x: Fraction, y: Fraction): Fraction;
    static mul(x: Fraction, y: Fraction): Fraction;
    static sMul(x: Fraction, y: Fraction): Fraction;
    static div(x: Fraction, y: Fraction): Fraction;
    static sDiv(x: Fraction, y: Fraction): Fraction;
    static abs(x: Fraction): Fraction;
    static sAbs(x: Fraction): Fraction;
    static equal(x: Fraction, y: Fraction): boolean;
    static sEqual(x: Fraction, y: Fraction): boolean;
    static toInt(x: Fraction): bigint;
    static fromInt(numerator: bigint, denominator: bigint): Fraction;
    static scaleUp(x: Fraction, s: bigint): bigint;
}
