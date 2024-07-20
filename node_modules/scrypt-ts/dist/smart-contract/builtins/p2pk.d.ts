import { bsv } from "scryptlib";
import { SmartContract } from "../contract";
import { PubKey, Sig } from "./types";
export declare class P2PK extends SmartContract {
    readonly pubKey: PubKey;
    constructor(pubKey: PubKey);
    unlock(sig: Sig): void;
    get lockingScript(): bsv.Script;
}
