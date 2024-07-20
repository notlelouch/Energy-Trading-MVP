import { bsv } from "scryptlib";
export declare function getTransaction(network: bsv.Networks.Network, txId: string): Promise<bsv.Transaction>;
