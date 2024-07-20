import "reflect-metadata";
import { StructObject, SupportedParamType } from "scryptlib";
/**
 * The contract library class. To write a contract library, extend this class as such:
 * @example
 *  ```ts
 * class YourSmartContractLib extends SmartContractLib {
 *   // your library functions code here
 * }
 * ```
 * @category SmartContract
 */
export declare class SmartContractLib {
    args: any[];
    constructor(...args: any[]);
    /**
     *
     * @ignore
     */
    getArgs(): SupportedParamType[];
    /**
     *
     * @ignore
     */
    getState(): StructObject;
}
