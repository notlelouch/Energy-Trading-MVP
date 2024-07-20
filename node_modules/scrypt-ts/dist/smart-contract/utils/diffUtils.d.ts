import { bsv } from 'scryptlib';
import { AbstractContract } from 'scryptlib';
import { CallLog, StatefulNext } from '../types';
import { SmartContract } from '../contract';
import { ByteString } from '../builtins/types';
type SerializedOutput = {
    script: string;
    satoshis: number;
    states?: any;
};
/** @ignore */
export declare function getTransationOutputs(tx: bsv.Transaction, inputIndex: number, sigHashType: number): Array<SerializedOutput>;
/** @ignore */
export declare function getExpectedOutputs(hex: ByteString): Array<SerializedOutput>;
/**
 *
 * Compare the expected outputs of the contract with the actual outputs of the transaction
 * @ignore
 * @param contract
 * @param expectedOutputs
 * @param transactionOutputs
 * @returns json string with diff information
 */
export declare function diffOutputs(contract: AbstractContract, expectedOutputs: Array<SerializedOutput>, transactionOutputs: Array<SerializedOutput>): string;
/** @ignore */
export declare function mergeNexts<T extends SmartContract>(calllogs: Array<CallLog>): StatefulNext<T>[];
export {};
