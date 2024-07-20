import { SmartContractLib, ByteString } from 'scrypt-ts';
export declare class ArrayUtils extends SmartContractLib {
    static getElemAt(b: ByteString, idx: bigint): ByteString;
    static setElemAt(b: ByteString, idx: bigint, val: ByteString): ByteString;
}
