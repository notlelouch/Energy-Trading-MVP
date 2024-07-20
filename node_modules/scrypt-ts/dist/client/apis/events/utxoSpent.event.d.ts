export interface UtxoSpentEvent {
    readonly event: 'utxoSpent';
    readonly spentUtxo: {
        readonly txId: string;
        readonly outputIndex: number;
    };
    readonly spentBy: {
        readonly txId: string;
        readonly inputIndex: number;
    };
    readonly contractId: {
        readonly txId: string;
        readonly outputIndex: number;
    };
    readonly createdInSpentTxOutputs?: number[];
}
