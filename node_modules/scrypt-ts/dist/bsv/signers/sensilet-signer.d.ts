import { PublicKey } from "bsv";
import { bsv } from "scryptlib";
import { Provider } from "../abstract-provider";
import { Signer, SignatureRequest, SignatureResponse } from "../abstract-signer";
import { AddressOption } from "../types";
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [sensilet wallet]{@link https://sensilet.com},
 * and dapps can use to interact with the Sensilet wallet
 */
export declare class SensiletSigner extends Signer {
    static readonly DEBUG_TAG = "SensiletSigner";
    private _target;
    private _address;
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
    getNetwork(): Promise<bsv.Networks.Network>;
    getBalance(address?: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    getDefaultPubKey(): Promise<PublicKey>;
    getPubKey(address: AddressOption): Promise<PublicKey>;
    signMessage(message: string, address?: AddressOption): Promise<string>;
    getSignatures(rawTxHex: string, sigRequests: SignatureRequest[]): Promise<SignatureResponse[]>;
}
