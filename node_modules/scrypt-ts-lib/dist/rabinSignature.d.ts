import { ByteString, SmartContractLib } from 'scrypt-ts';
export type RabinPubKey = bigint;
export type RabinSig = {
    s: bigint;
    padding: ByteString;
};
export declare class RabinVerifier extends SmartContractLib {
    static readonly SECURITY_LEVEL = 6;
    static expandHash(x: ByteString): ByteString;
    static hash(x: ByteString): ByteString;
    static verifySig(msg: ByteString, sig: RabinSig, pubKey: RabinPubKey): boolean;
}
/**
 * Rabin signature verifier for WitnessOnChain.
 * @see {@link https://api.witnessonchain.com }
 */
export declare class WitnessOnChainVerifier extends SmartContractLib {
    static verifySig(msg: ByteString, sig: RabinSig, pubKey: RabinPubKey): boolean;
    static parseMsg(response: {
        data: string;
    }): ByteString;
    static parsePubKey(response: {
        publicKey: string;
    }): RabinPubKey;
    static parseSig(response: {
        signature: {
            s: string;
            padding: string;
        };
    }): RabinSig;
}
