import { Networks } from "bsv";
import { bsv } from "scryptlib";
import { Provider, TransactionResponse, TxHash, UtxoQueryOptions } from "../bsv/abstract-provider";
import { AddressOption, UTXO } from "../bsv/types";
/**
 * The GorillapoolProvider is backed by [gorillapool]{@link https://gorillapool.io/swagger/}
 */
export declare class GorillapoolProvider extends Provider {
    private apiKey?;
    private _network;
    private _provider;
    private _feePerKb;
    private _mapiURL;
    constructor(network: bsv.Networks.Network, apiKey?: string);
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
    private _fetchFeePerKb;
}
