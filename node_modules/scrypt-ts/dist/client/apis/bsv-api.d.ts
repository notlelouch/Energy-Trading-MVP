import { bsv } from "scryptlib";
import { Core } from "../core/core";
import { UtxoQueryOptions } from "../../bsv/abstract-provider";
import { UTXO } from "../../bsv/types";
export declare class BsvApi {
    private readonly _core;
    constructor(_core: Core);
    getTransaction(txId: string): Promise<bsv.Transaction>;
    getBalance(address: bsv.Address): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    getFeePerKB(): Promise<number>;
    connect(): Promise<{
        success: boolean;
        error: string;
    }>;
    sendRawTransaction(txHex: string): Promise<string>;
    listUnspent(address: bsv.Address, options?: UtxoQueryOptions): Promise<UTXO[]>;
}
