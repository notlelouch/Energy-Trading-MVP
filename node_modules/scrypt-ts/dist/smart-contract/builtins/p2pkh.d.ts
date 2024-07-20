import { bsv } from "scryptlib";
import { SmartContract } from "../contract";
import { Addr, PubKey, Sig } from "./types";
export declare class P2PKH extends SmartContract {
    readonly addr: Addr;
    constructor(addr: Addr);
    unlock(sig: Sig, pubkey: PubKey): void;
    get lockingScript(): bsv.Script;
}
