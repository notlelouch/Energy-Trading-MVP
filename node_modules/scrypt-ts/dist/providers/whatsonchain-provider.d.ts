import { Networks } from "bsv";
import { bsv } from "scryptlib";
import { Provider, TransactionResponse, TxHash, UtxoQueryOptions } from "../bsv/abstract-provider";
import { AddressOption, UTXO } from "../bsv/types";
/**
 * The WhatsonchainProvider is backed by [whatsonchain]{@link https://whatsonchain.com},
 * which is the popular blockchain exxplorer for Bitcoin.
 */
export declare class WhatsonchainProvider extends Provider {
    private _network;
    private _isConnected;
    constructor(network: bsv.Networks.Network);
    get apiPrefix(): string;
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
