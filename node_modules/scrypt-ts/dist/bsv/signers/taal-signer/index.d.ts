import { Provider } from "../../abstract-provider";
import { Signer, SignTransactionOptions, SignatureRequest, SignatureResponse } from "../../abstract-signer";
import { bsv } from "scryptlib";
import { AddressOption } from "../../types";
import { Transaction, PublicKey } from 'bsv';
interface InputInfo {
    inputIndex: number;
    satoshis: number;
    scriptHex: string;
}
export declare class TAALSigner extends Signer {
    private _port;
    private _app_name;
    constructor(provider: Provider, app_name?: string);
    isAuthenticated(): Promise<boolean>;
    requestAuth(): Promise<{
        isAuthenticated: boolean;
        error: string;
    }>;
    private assertIsAuthenticated;
    setProvider(provider: Provider): void;
    getDefaultAddress(): Promise<bsv.Address>;
    getDefaultPubKey(): Promise<PublicKey>;
    getPubKey(address: AddressOption): Promise<PublicKey>;
    getNetwork(): Promise<bsv.Networks.Network>;
    updateInputsWithInfo(tx: Transaction, inputInfos: InputInfo[]): Transaction;
    signTransaction(tx: Transaction, options?: SignTransactionOptions): Promise<Transaction>;
    /**
     * Get signatures with api
     * @param rawTxHex a transation raw hex
     * @param sigRequests a `SignatureRequest` array for the some inputs of the transaction.
     * @returns a `SignatureResponse` array
     */
    getSignatures(rawTxHex: string, sigRequests: SignatureRequest[]): Promise<SignatureResponse[]>;
    signMessage(message: string, address?: AddressOption): Promise<string>;
    getBalance(address?: AddressOption): Promise<{
        confirmed: number;
        unconfirmed: number;
    }>;
    private signCustomInput;
}
export {};
