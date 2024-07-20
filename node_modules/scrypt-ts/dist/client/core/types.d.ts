export interface JSONResponseEnvelope<T> {
    statusCode: number;
    errorMsg?: string;
    data?: T;
}
/**
 * ContractId is a unique identifier for a contract.
 * It is the outpoint referenced by the deployment transaction id and the output index.
 */
export type ContractId = {
    /** The deployment transaction id */
    txId: string;
    /** The output index */
    outputIndex: number;
};
/**
 * SerializedHashedProp is a serialized @prop in json format of a smart contract.
 */
export interface SerializedHashedProp {
    name: string;
    type: 'HashedSet' | 'HashedMap';
    value: any;
}
