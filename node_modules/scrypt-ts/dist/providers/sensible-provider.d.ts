import { Networks } from "bsv";
import { bsv } from "scryptlib";
import { Provider, TransactionResponse, TxHash, UtxoQueryOptions } from "../bsv/abstract-provider";
import { AddressOption, UTXO } from "../bsv/types";
/**
 * The SensibleProvider is backed by [Sensible]{@link https://github.com/sensible-contract/sensiblequery},
 */
export declare class SensibleProvider extends Provider {
    private network;
    private apiKey;
    private _isConnected;
    constructor(network: bsv.Networks.Network, apiKey: string);
    get apiEndpoint(): string;
    isConnected(): boolean;
    connect(): Promise<this>;
    updateNetwork(network: Networks.Network): void;
    getNetwork(): Networks.Network;
    sendRawTransaction(rawTxHex: string): Promise<TxHash>;
    listUnspent(address: AddressOption, options?: UtxoQueryOptions): Promise<UTXO[]>;
    getBalance(address: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    getTransaction(txHash: string): Promise<TransactionResponse>;
    getFeePerKb(): Promise<number>;
}
