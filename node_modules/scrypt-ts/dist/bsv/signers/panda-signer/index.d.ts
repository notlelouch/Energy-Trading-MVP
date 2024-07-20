import { Provider } from "../../abstract-provider";
import { Signer, SignatureRequest, SignatureResponse } from "../../abstract-signer";
import { bsv } from "scryptlib";
import { AddressOption } from "../../types";
export interface Ordinal {
    txid: string;
    vout: number;
    outpoint: string;
    satoshis: number;
    accSats: string;
    height: number;
    idx: string;
    owner: string;
    spend: string;
    origin: Origin;
    data: Data;
}
export interface Data {
    insc: Insc;
    types: string[];
}
export interface Insc {
    file: File;
    json: JSON;
}
export interface File {
    hash: string;
    size: number;
    type: string;
}
export interface JSON {
    p: string;
    op: string;
    amt: string;
    tick: string;
}
export interface Origin {
    outpoint: string;
    data: Data;
    num: number;
}
type TransferOptions = {
    address: string;
    origin: string;
    outpoint: string;
};
export interface PandaSignRequest {
    prevTxid: string;
    outputIndex: number;
    /** The index of input to sign. */
    inputIndex: number;
    /** The previous output satoshis value of the input to spend. */
    satoshis: number;
    /** The address(es) of corresponding private key(s) required to sign the input. */
    address: string | string[];
    /** The previous output script of input, default value is a P2PKH locking script for the `address` if omitted. */
    script?: string;
    /** The sighash type, default value is `SIGHASH_ALL | SIGHASH_FORKID` if omitted. */
    sigHashType?: number;
    /**
     * Index of the OP_CODESEPARATOR to split the previous output script at during verification.
     * If undefined, the whole script is used.
     * */
    csIdx?: number;
    /** The extra information for signing. */
    data?: unknown;
}
export interface PandaSignResponse {
    /** The index of input. */
    inputIndex: number;
    /** The signature.*/
    sig: string;
    /** The public key bound with the `sig`. */
    pubKey: string;
    /** The sighash type, default value is `SIGHASH_ALL | SIGHASH_FORKID` if omitted. */
    sigHashType: number;
    /** The index of the OP_CODESEPARATOR to split the previous output script at.*/
    csIdx?: number;
}
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [panda wallet]{@link https://panda.com},
 * and dapps can use to interact with the panda wallet
 */
export declare class PandaSigner extends Signer {
    static readonly DEBUG_TAG = "PandaSigner";
    private _target;
    constructor(provider: Provider);
    /**
     * Check if the wallet has been authenticated
     * @returns {boolean} true | false
     */
    isAuthenticated(): Promise<boolean>;
    /**
     * Request wallet authentication
     * @returns A promise which resolves to if the wallet has been authenticated and the authenticate error message
     */
    requestAuth(): Promise<{
        isAuthenticated: boolean;
        error: string;
    }>;
    private _initTarget;
    private getConnectedTarget;
    setProvider(provider: Provider): void;
    getDefaultAddress(): Promise<bsv.Address>;
    /**
     * get ordinals address of panda wallet
     * @returns
     */
    getOrdAddress(): Promise<bsv.Address>;
    getNetwork(): Promise<bsv.Networks.Network>;
    getBalance(address?: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    getDefaultPubKey(): Promise<bsv.PublicKey>;
    /**
     * get ordinal PubKey of panda wallet
     * @returns a PubKey
     */
    getOrdPubKey(): Promise<bsv.PublicKey>;
    /**
     * get all ordinals nft
     * @returns a list of Ordinals
     */
    getOrdinals(): Promise<Array<Ordinal>>;
    /**
     * transfer ordinal nft
     * @param options
     * @returns transfer transaction id
     */
    transferOrdinal(options: TransferOptions): Promise<string>;
    getPubKey(address: AddressOption): Promise<bsv.PublicKey>;
    signMessage(message: string, address?: AddressOption): Promise<string>;
    getSignatures(rawTxHex: string, sigRequests: SignatureRequest[]): Promise<SignatureResponse[]>;
}
export {};
