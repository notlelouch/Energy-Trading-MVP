import { bsv } from 'scryptlib';
import { Provider, UtxoQueryOptions, TransactionResponse } from './abstract-provider';
import { AddressesOption, AddressOption, UTXO } from './types';
export declare const DEFAULT_SIGHASH_TYPE: number;
/**
 * `SignatureRequest` contains required information for a signer to sign a certain input of a transaction.
 */
export interface SignatureRequest {
    prevTxId: string;
    outputIndex: number;
    /** The index of input to sign. */
    inputIndex: number;
    /** The previous output satoshis value of the input to spend. */
    satoshis: number;
    /** The address(es) of corresponding private key(s) required to sign the input. */
    address: AddressesOption;
    /** The previous output script of input, default value is a P2PKH locking script for the `address` if omitted. */
    scriptHex?: string;
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
/**
 * `SignatureResponse` contains the signing result corresponding to a `SignatureRequest`.
 */
export interface SignatureResponse {
    /** The index of input. */
    inputIndex: number;
    /** The signature.*/
    sig: string;
    /** The public key bound with the `sig`. */
    publicKey: string;
    /** The sighash type, default value is `SIGHASH_ALL | SIGHASH_FORKID` if omitted. */
    sigHashType: number;
    /** The index of the OP_CODESEPARATOR to split the previous output script at.*/
    csIdx?: number;
}
/**
 * `SignTransactionOptions` is the options can be provided when signing a transaction.
*/
export interface SignTransactionOptions {
    /** The `SignatureRequest` for the some inputs of the transaction. */
    sigRequests?: SignatureRequest[];
    /** The address(es) whose corresponding private key(s) should be used to sign the tx. */
    address?: AddressesOption;
}
/**
 * A `Signer` is a class which in some way directly or indirectly has access to a private key, which can sign messages and transactions to authorize the network to perform operations.
 */
export declare abstract class Signer {
    provider?: Provider;
    readonly _isSigner: boolean;
    constructor(provider?: Provider);
    abstract getNetwork(): Promise<bsv.Networks.Network>;
    /**
     * Check if the wallet has been authenticated
     * @returns {boolean} true | false
     */
    abstract isAuthenticated(): Promise<boolean>;
    /**
     * Request wallet authentication
     * @returns A promise which resolves to if the wallet has been authenticated and the authenticate error message
     */
    abstract requestAuth(): Promise<{
        isAuthenticated: boolean;
        error: string;
    }>;
    /**
     * swith provider
     * @param provider The target provider.
     * @returns
     */
    abstract setProvider(provider: Provider): void;
    /**
     *
     * @returns A promise which resolves to the public key of the default private key of the signer.
     */
    abstract getDefaultPubKey(): Promise<bsv.PublicKey>;
    /**
     *
     * @returns A promise which resolves to the address to the default private key of the signer.
     */
    abstract getDefaultAddress(): Promise<bsv.Address>;
    /**
     *
     * @param address The request address, using the default address if omitted.
     * @returns The public key result.
     * @throws If the private key for the address does not belong this signer.
     */
    abstract getPubKey(address?: AddressOption): Promise<bsv.PublicKey>;
    /**
     * Sign a raw transaction hex string.
     *
     * @param rawTxHex The raw transaction hex to sign.
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the signed transaction hex string.
     * @throws If any input of the transaction can not be signed properly.
     */
    signRawTransaction(rawTxHex: string, options: SignTransactionOptions): Promise<string>;
    /**
     * Sign a transaction object. By default only signs inputs, which are unlocking P2PKH UTXO's.
     * @param tx The transaction object to sign.
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the signed transaction object.
     */
    signTransaction(tx: bsv.Transaction, options?: SignTransactionOptions): Promise<bsv.Transaction>;
    /**
     * Sign a message string.
     * @param message The message to be signed.
     * @param address The optional address whose private key will be used to sign `message`, using the default private key if omitted.
     * @returns A promise which resolves to the signautre of the message.
     */
    abstract signMessage(message: string, address?: AddressOption): Promise<string>;
    /**
     * Get the requested transaction signatures for the raw transaction.
     * @param rawTxHex The raw transaction hex to get signatures from.
     * @param sigRequests The signature requst informations, see details in `SignatureRequest`.
     * @returns A promise which resolves to a list of `SignatureReponse` corresponding to `sigRequests`.
     */
    abstract getSignatures(rawTxHex: string, sigRequests: SignatureRequest[]): Promise<SignatureResponse[]>;
    /**
     * Get the connected provider.
     * @returns the connected provider.
     * @throws if no provider is connected to `this`.
     */
    get connectedProvider(): Provider;
    /**
     * Sign transaction and broadcast it
     * @param tx A transaction is signed and broadcast
     * @param options The options for signing, see the details of `SignTransactionOptions`.
     * @returns A promise which resolves to the transaction id.
     */
    signAndsendTransaction(tx: bsv.Transaction, options?: SignTransactionOptions): Promise<TransactionResponse>;
    /**
     * Get a list of the P2PKH UTXOs.
     * @param address The address of the returned UTXOs belongs to.
     * @param options The optional query conditions, see details in `UtxoQueryOptions`.
     * @returns  A promise which resolves to a list of UTXO for the query options.
     */
    listUnspent(address: AddressOption, options?: UtxoQueryOptions): Promise<UTXO[]>;
    /**
     * Get the balance of BSVs in satoshis for an address.
     * @param address The query address.
     * @returns A promise which resolves to the address balance status.
     */
    getBalance(address?: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    /**
     * Check if an object is a `Signer`
     * @param value The target object
     * @returns Returns `true` if and only if `object` is a Provider.
     */
    static isSigner(value: any): value is Signer;
    /**
     * Align provider's network after the signer is authenticated
     */
    alignProviderNetwork(): Promise<void>;
}
