/// <reference types="node" />
import EventEmitter from 'events';
import { bsv } from 'scryptlib';
import { AddressOption, UTXO } from './types';
export interface TransactionResponse extends bsv.Transaction {
}
export type TxHash = string;
/**
 * The optional conditions for querying P2PKH UTXO.
 *
 */
export interface UtxoQueryOptions {
    unspentValue: number;
    estimateSize: number;
    feePerKb: number;
    additional?: number;
}
/**
 * The provider is an EventEmitter, and the following are all the events it can emit.
 * https://stackoverflow.com/a/50511773
 */
export declare const enum ProviderEvent {
    /** The provider will send a 'Connected' event after the connection is successful. */
    Connected = "connected",
    /** After the network connected to the provider changes, it will issue the 'NetworkChange' event, such as switching from the testnet to the mainnet. */
    NetworkChange = "networkChange"
}
/**
 * A Provider is an abstraction of non-account-based operations on a blockchain and is generally not directly involved in signing transaction or data.
 */
export declare abstract class Provider extends EventEmitter {
    constructor();
    /**
     * check if provider is ready
     */
    abstract isConnected(): boolean;
    protected _initializeConnection(): void;
    protected _ready(): Promise<void>;
    /**
     * Implement the connection provider, for example, verify the api key during the connection process.
     * @returns a connected provider. Throw an exception if the connection fails.
     */
    abstract connect(): Promise<this>;
    /**
     * update provider network
     * @param network  Network type to be updated
     */
    abstract updateNetwork(network: bsv.Networks.Network): void;
    /**
     * @returns The network this provider is connected to.
     */
    abstract getNetwork(): bsv.Networks.Network;
    /**
     * @returns The fee rate for sending transactions through this provider.
     */
    abstract getFeePerKb(): Promise<number>;
    /**
   * Get a best guess of the fee for a transaction.
   * @param tx A transaction object to estimate.
   * @returns The estimated fee in satoshis.
   */
    getEstimateFee(tx: bsv.Transaction): Promise<number>;
    /**
     * Send a raw transaction hex string.
     * @param rawTxHex The raw transaction hex string to send.
     * @returns A promise which resolves to the hash of the transaction that has been sent.
     */
    abstract sendRawTransaction(rawTxHex: string): Promise<TxHash>;
    /**
     * Send a transaction object.
     * @param tx The transaction object to send.
     * @returns A promise which resolves to the hash of the transaction that has been sent.
     * @throws If there is a problem with the `tx` object during serialization.
     */
    sendTransaction(tx: bsv.Transaction): Promise<TxHash>;
    /**
     * Get a transaction from the network.
     * @param txHash The hash value of the transaction.
     * @returns The query result with the transaction information.
     */
    abstract getTransaction(txHash: TxHash): Promise<TransactionResponse>;
    /**
     * Get a list of the P2PKH UTXOs.
     * @param address The address of the returned UTXOs belongs to.
     * @param options The optional query conditions, see details in `UtxoQueryOptions`.
     * @returns  A promise which resolves to a list of UTXO for the query options.
     */
    abstract listUnspent(address: AddressOption, options?: UtxoQueryOptions): Promise<UTXO[]>;
    /**
     * Get the balance of BSVs in satoshis for an address.
     * @param address The query address.
     * @returns A promise which resolves to the address balance status.
     */
    abstract getBalance(address?: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    readonly _isProvider: boolean;
    /**
     * Check if an object is a `Provider`
     * @param value The target object
     * @returns Returns `true` if and only if `object` is a Provider.
     */
    static isProvider(value: any): value is Provider;
}
