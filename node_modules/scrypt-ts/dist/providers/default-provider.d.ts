import { bsv } from "scryptlib";
import { Provider, TransactionResponse, UtxoQueryOptions } from "../bsv/abstract-provider";
import { AddressOption } from "../bsv/types";
import { ScryptConfig } from "../client/core/core";
export interface DefaultProviderOption {
    /** api key of taal */
    taal?: string;
    /** api key of gorillapool */
    gorillapool?: string;
    /** api key of sensible */
    sensible?: string;
    /** api key of scrypt */
    scrypt?: ScryptConfig;
    network?: bsv.Networks.Network;
}
/**
 * The default provider is the safest, easiest way to begin developing on Bitcon,
 * and it is also robust enough for use in production.
 */
export declare class DefaultProvider extends Provider {
    private _providers;
    constructor(options?: DefaultProviderOption);
    get bestProvider(): Provider;
    isConnected(): boolean;
    connect(): Promise<this>;
    updateNetwork(network: bsv.Networks.Network): void;
    getNetwork(): bsv.Networks.Network;
    getFeePerKb(): Promise<number>;
    sendRawTransaction(rawTxHex: string): Promise<string>;
    getTransaction(txHash: string): Promise<TransactionResponse>;
    listUnspent(address: AddressOption, options?: UtxoQueryOptions): Promise<bsv.Transaction.IUnspentOutput[]>;
    getBalance(address: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
}
