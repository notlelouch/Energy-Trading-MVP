import BigNumber from './BigNumber.js';
import ReductionContext from './ReductionContext.js';
import Point from './Point.js';
export default class Curve {
    p: BigNumber;
    red: ReductionContext;
    redN: BigNumber | null;
    zero: BigNumber;
    one: BigNumber;
    two: BigNumber;
    g: Point;
    n: BigNumber;
    a: BigNumber;
    b: BigNumber;
    tinv: BigNumber;
    zeroA: boolean;
    threeA: boolean;
    endo: any;
    _endoWnafT1: any[];
    _endoWnafT2: any[];
    _wnafT1: any[];
    _wnafT2: any[];
    _wnafT3: any[];
    _wnafT4: any[];
    _bitLength: number;
    static assert(expression: unknown, message?: string): void;
    getNAF(num: BigNumber, w: number, bits: number): number[];
    getJSF(k1: BigNumber, k2: BigNumber): number[][];
    static cachedProperty(obj: any, name: string, computer: any): void;
    static parseBytes(bytes: string | number[]): number[];
    static intFromLE(bytes: number[]): BigNumber;
    constructor();
    _getEndomorphism(conf: any): {
        beta: BigNumber;
        lambda: BigNumber;
        basis: Array<{
            a: BigNumber;
            b: BigNumber;
        }>;
    } | undefined;
    _getEndoRoots(num: BigNumber): [BigNumber, BigNumber];
    _getEndoBasis(lambda: BigNumber): [{
        a: BigNumber;
        b: BigNumber;
    }, {
        a: BigNumber;
        b: BigNumber;
    }];
    _endoSplit(k: BigNumber): {
        k1: BigNumber;
        k2: BigNumber;
    };
    validate(point: Point): boolean;
}
//# sourceMappingURL=Curve.d.ts.map