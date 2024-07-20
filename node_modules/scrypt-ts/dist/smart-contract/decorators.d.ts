import { SigHashType } from "scryptlib";
/**
 * @ignore
 */
export declare const MethodsMetaKey = "scrypt:methods";
/**
 * @ignore
 */
export interface MethodsMetaValue {
    argLength: number;
    sigHashType: SigHashType;
}
/**
 * Indicates whether the method is a contract method, and ordinary methods do not affect the execution of the contract
 * @category decorator
 */
export declare function method(sigHashType?: SigHashType): (target: any, methodName: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
/**
 * @ignore
 */
export declare const StatePropsMetaKey = "scrypt:stateProps";
/**
 * @ignore
 */
export declare const PropsMetaKey = "scrypt:props";
/**
 * Indicates whether the property is an property of a contract, and ordinary class properties cannot be accessed in contract methods
 * @category decorator
 * @param state - Whether the property is a property of a stateful contract
 */
export declare function prop(state?: boolean): (target: any, propertyName: string) => void;
