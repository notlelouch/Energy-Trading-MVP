import { PublicKey } from "bsv";
import { bsv } from "scryptlib";
import { Provider, UtxoQueryOptions } from "../abstract-provider";
import { Signer, SignatureRequest, SignatureResponse } from "../abstract-signer";
import { AddressOption, UTXO } from "../types";
/**
 * a [signer]{@link https://docs.scrypt.io/how-to-test-a-contract#signer } which implemented the protocol with the [dotwallet]{@link https://www.dotwallet.com/en},
 * and dapps can use to interact with the dotwallet.
 */
export declare class DotwalletSigner extends Signer {
    static readonly DEBUG_TAG = "DotwalletSigner";
    private accessToken;
    private sender;
    private default_public_key;
    private utxos_public_key;
    constructor(accessToken: string, provider: Provider);
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
    /**
     * Get a list of the P2PKH UTXOs.
     * @param address The address of the returned UTXOs belongs to.
     * @param options The optional query conditions, see details in `UtxoQueryOptions`.
     * @returns  A promise which resolves to a list of UTXO for the query options.
     */
    listUnspent(address: AddressOption, options?: UtxoQueryOptions): Promise<UTXO[]>;
}
