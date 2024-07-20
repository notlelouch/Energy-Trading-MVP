import { Networks } from "bsv";
import { bsv } from "scryptlib";
import { Provider, TransactionResponse, UtxoQueryOptions } from "../bsv/abstract-provider";
export declare class ScryptProvider extends Provider {
    private _isConnected;
    private network;
    constructor();
    isConnected(): boolean;
    connect(): Promise<this>;
    updateNetwork(newwork: Networks.Network): void;
    getNetwork(): Networks.Network;
    getFeePerKb(): Promise<number>;
    sendRawTransaction(rawTxHex: string): Promise<string>;
    getTransaction(txHash: string): Promise<TransactionResponse>;
    listUnspent(address: bsv.Address, options?: UtxoQueryOptions): Promise<bsv.Transaction.IUnspentOutput[]>;
    getBalance(address: bsv.Address): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
}
