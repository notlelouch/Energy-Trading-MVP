import { ByteString, PubKey, SmartContractLib } from 'scrypt-ts';
import { Point } from './ec/misc';
export declare class Schnorr extends SmartContractLib {
    static verify(sig: ByteString, pubKey: PubKey, msg: ByteString, R: Point): boolean;
}
