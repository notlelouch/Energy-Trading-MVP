import { bsv } from "scryptlib";
import { SignatureHashType } from "scryptlib/dist/scryptTypes";
export type UTXO = bsv.Transaction.IUnspentOutput;
export type Network = bsv.Networks.Network;
export type AddressOption = bsv.Address;
export type AddressesOption = AddressOption | AddressOption[];
export type PublicKeyOption = bsv.PublicKey;
export type PublicKeysOption = PublicKeyOption | PublicKeyOption[];
export type PublicKeysOrAddressesOption = AddressesOption | PublicKeysOption;
export type SignatureOption = {
    pubKeyOrAddr: PublicKeysOrAddressesOption;
    sigHashType?: SignatureHashType;
    /**
     * Index of the OP_CODESEPARATOR to split the previous output script at during verification.
     * If undefined, the whole script is used.
     * */
    csIdx?: number;
    /** The extra data of signature request that will be passed to the signer when signing */
    data?: any;
};
export type SignaturesOption = SignatureOption | SignatureOption[];
export { SignatureHashType };
