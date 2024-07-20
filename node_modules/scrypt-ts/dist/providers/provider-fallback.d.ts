import { Provider, TransactionResponse, UtxoQueryOptions } from "../bsv/abstract-provider";
import { bsv } from "scryptlib";
/**
 *  A configuration entry for how to use a [[Provider]].
 */
export interface FallbackProviderConfig {
    provider: Provider;
    stallTimeout?: number;
    priority?: number;
    weight?: number;
}
interface Config extends Required<FallbackProviderConfig> {
}
/**
 *  A Fallback Provider.
 *
 */
export declare class FallbackProvider extends Provider {
    readonly quorum: number;
    readonly configs: Array<Config>;
    constructor(providers: Array<Provider | FallbackProviderConfig>);
    isConnected(): boolean;
    connect(): Promise<this>;
    updateNetwork(network: bsv.Networks.Network): void;
    getNetwork(): bsv.Networks.Network;
    getFeePerKb(): Promise<number>;
    sendRawTransaction(rawTxHex: string): Promise<string>;
    getTransaction(txHash: string): Promise<TransactionResponse>;
    listUnspent(address: bsv.Address, options?: UtxoQueryOptions): Promise<bsv.Transaction.IUnspentOutput[]>;
    getBalance(address: bsv.Address): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    private _getBestProviderResult;
    private _getFastProviderResult;
    perform<T = any>(method: string, req: (provider: Provider) => Promise<any>): Promise<T>;
}
export {};
