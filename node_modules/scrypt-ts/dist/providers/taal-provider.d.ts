import { Networks } from "bsv";
import { Provider, TransactionResponse, TxHash, UtxoQueryOptions } from "../bsv/abstract-provider";
import { AddressOption, UTXO } from "../bsv/types";
/**
 * The TaalProvider is backed by [taal]{@link https://console.taal.com/},
 * which is the popular blockchain exxplorer for Bitcoin.
 */
export declare class TaalProvider extends Provider {
    private apiKey;
    private _network;
    private _provider;
    private _feePerKb;
    constructor(apiKey?: string);
    get apiPrefix(): string;
    isConnected(): boolean;
    connect(): Promise<this>;
    updateNetwork(network: Networks.Network): void;
    getNetwork(): Networks.Network;
    sendRawTransaction(rawTxHex: string): Promise<TxHash>;
    listUnspent(address: AddressOption, options: UtxoQueryOptions): Promise<UTXO[]>;
    getBalance(address: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    getTransaction(txHash: string): Promise<TransactionResponse>;
    getFeePerKb(): Promise<number>;
    private _fetchFeePerKb;
}
