import { bsv } from "scryptlib";
import { AddressOption, UTXO, PublicKeysOrAddressesOption, SignaturesOption } from "../../bsv/types";
import { SmartContract } from "../contract";
/**
 * Contains information about the new state of a set of stateful contracts, used to construct transactions in the transaction builder.
 */
export interface StatefulNext<T> {
    /** The subsequent stateful contract instance */
    instance: T;
    /** Satoshis of the subsequent contract output in the method calling tx */
    balance: number;
    /** The index of the subsequent contract output in the method calling tx */
    atOutputIndex: number;
}
/**
 * A option type to call a contract public `@method` function.
 * Used to specify the behavior of signers and transaction builders.
 * For example, specifying a transaction builder to use a specific change address or specifying a signer to use a specific public key to sign.
 */
export interface MethodCallOptions<T> {
    /**
     * The private key(s) associated with these address(es) or public key(s)
     * must be used to sign the contract input,
     * and the callback function will receive the results of the signatures as an argument named `sigResponses`
     * */
    readonly pubKeyOrAddrToSign?: PublicKeysOrAddressesOption | SignaturesOption;
    /** The subsequent contract instance(s) produced in the outputs of the method calling tx in a stateful contract */
    readonly next?: StatefulNext<T>[] | StatefulNext<T>;
    /** The `lockTime` of the method calling tx */
    readonly lockTime?: number;
    /** The `sequence` of the input spending previous contract UTXO in the method calling tx */
    readonly sequence?: number;
    /** The previous contract UTXO to spend in the method calling tx */
    readonly fromUTXO?: UTXO;
    /** The P2PKH change output address */
    readonly changeAddress?: AddressOption;
    /** verify transaction before send transaction */
    readonly verify?: boolean;
    /** Whether to call multiple contracts at the same time in one transaction */
    readonly multiContractCall?: boolean;
    /** Pass the `ContractTransaction` of the previous call as an argument to the next call, only used if `multiContractCall = true`.  */
    readonly partialContractTx?: ContractTransaction;
    /** signer does not contain all private keys, it is used when multiple parties are required to perform signature authorization, default is false， only work in single call */
    readonly partiallySigned?: boolean;
    /** execute a contract's public method to to check if arguments are valid, default is true */
    readonly exec?: boolean;
    /** auto add utxo to pay transaction fee, default is true*/
    readonly autoPayFee?: boolean;
}
export interface MultiContractCallOptions {
    /** verify transaction before send transaction */
    readonly verify?: boolean;
    /** signer does not contain all private keys, it is used when multiple parties are required to perform signature authorization, default is false， only work in single call */
    readonly partiallySigned?: boolean;
    /** auto add utxo to pay transaction fee, default is true*/
    readonly autoPayFee?: boolean;
}
/** A structure describing a transaction that invokes a single contract. */
export interface ContractTransaction {
    /** The method calling tx */
    tx: bsv.Transaction;
    /** The input index of previous contract UTXO to spend in the method calling tx */
    atInputIndex: number;
    /** The subsequent contract instance(s) produced in the outputs of the method calling tx in a stateful contract */
    nexts: StatefulNext<any>[];
    /** The first element of nexts, this value should be set for user convenience. */
    next?: StatefulNext<any>;
}
/** A structure describing a transaction that invokes multiple contracts. */
export interface MultiContractTransaction {
    /** The method calling tx */
    tx: bsv.Transaction;
    /** The input indices of previous contract UTXOs to spend in the method calling tx */
    atInputIndices: number[];
    /** The subsequent contract instance(s) produced in the outputs of the method calling tx in a stateful contract */
    nexts: StatefulNext<any>[];
}
/**
 * A transaction builder.
 * The default transaction builder only supports fixed-format call transactions.
 * Some complex contracts require a custom transaction builder to successfully call the contract.
 */
export interface MethodCallTxBuilder<T extends SmartContract> {
    (current: T, options: MethodCallOptions<T>, ...args: any): Promise<ContractTransaction>;
}
/**
 * @ignore
 */
export interface CallLog {
    instance: SmartContract;
    atInputIndex: number;
    methodArgs: any[];
    sigArgs: Map<number, {
        callback: Function;
        length: number;
    }>;
    pubKeyOrAddrToSign?: PublicKeysOrAddressesOption | SignaturesOption;
    nexts: StatefulNext<any>[];
    methodName: string;
    exec?: boolean;
}
