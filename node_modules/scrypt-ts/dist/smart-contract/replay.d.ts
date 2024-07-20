import { SmartContract } from './contract';
interface Outpoint {
    txId: string;
    outputIndex: number;
}
export declare function replayToLatest<T extends SmartContract>(instance: T, outpoint: Outpoint): Promise<T | undefined>;
export {};
