import { Networks } from "bsv";
import { bsv } from "scryptlib";
import { Provider, TransactionResponse, UtxoQueryOptions } from "../bsv/abstract-provider";
import { AddressOption } from "../bsv/types";
/**
 * A DummyProvider is build for test purpose only, it always returns a dummy utxo for `listUnspent` request.
 */
export declare class DummyProvider extends Provider {
    satoshisArray: number[];
    constructor(satoshisArray?: number[]);
    isConnected(): boolean;
    connect(): Promise<this>;
    updateNetwork(_network: Networks.Network): void;
    getNetwork(): Networks.Network;
    getFeePerKb(): Promise<number>;
    sendRawTransaction(rawTxHex: string): Promise<string>;
    getTransaction(txHash: string): Promise<TransactionResponse>;
    listUnspent(address: AddressOption, options?: UtxoQueryOptions): Promise<bsv.Transaction.IUnspentOutput[]>;
    getBalance(address: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
}
