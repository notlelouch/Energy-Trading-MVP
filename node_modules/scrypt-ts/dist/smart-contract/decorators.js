"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prop = exports.PropsMetaKey = exports.StatePropsMetaKey = exports.method = exports.MethodsMetaKey = void 0;
const functions_1 = require("./builtins/functions");
const lodash_1 = require("lodash");
const contract_1 = require("./contract");
const library_1 = require("./library");
/**
 * @ignore
 */
exports.MethodsMetaKey = "scrypt:methods";
/**
 * Indicates whether the method is a contract method, and ordinary methods do not affect the execution of the contract
 * @category decorator
 */
function method(sigHashType = functions_1.SigHash.ALL) {
    return function (target, methodName, descriptor) {
        const originalMethod = descriptor.value;
        let methods = Reflect.getOwnMetadata(exports.MethodsMetaKey, target) || new Map();
        methods.set(methodName, { argLength: originalMethod.length, sigHashType });
        Reflect.defineMetadata(exports.MethodsMetaKey, methods, target);
        const newDescriptor = {
            configurable: true,
            enumerable: false,
            get() {
                const wrappedMethod = (...args) => {
                    // static method on subclasses of `SmartContract`
                    const isStatic = typeof target === "function";
                    if (isStatic) {
                        return originalMethod.apply(this, args);
                    }
                    // instance method on subclasses of `SmartContractLib`
                    const isSmartContractLib = this instanceof library_1.SmartContractLib;
                    if (isSmartContractLib) {
                        return originalMethod.apply(this, args);
                    }
                    // instance method on subclasses of `SmartContract`
                    const isSmartContractMethod = this instanceof contract_1.SmartContract;
                    if (isSmartContractMethod) {
                        let pubCallRet = this.callDelegatedMethod(methodName, ...args);
                        // if public @method is called
                        if (pubCallRet) {
                            const { publicMethodCall, txPreimage, traceableArgCallbacks, abi, prevouts } = pubCallRet;
                            if (txPreimage) {
                                this.setCtx(txPreimage);
                                // check preimage before run the method
                                if (abi.params.find(param => param.type === "SigHashPreimage" && param.name === '__scrypt_ts_txPreimage')) {
                                    (0, functions_1.assert)(this.checkPreimageSigHashType(txPreimage, sigHashType), "checkPreimage failed!");
                                }
                            }
                            args = publicMethodCall.args.map(a => a.value);
                            // make a deep copy of args bcz it may be mutated in method
                            const immutableArgs = args.map(a => (0, lodash_1.cloneDeep)(a));
                            // apply js method
                            this._currentMethod = methodName;
                            if (prevouts && txPreimage) {
                                if (abi.params.find(param => param.type === "bytes" && param.name === '__scrypt_ts_prevouts')) {
                                    (0, functions_1.assert)((0, functions_1.hash256)(prevouts) === functions_1.SigHash.hashPrevouts(txPreimage), "check prevouts failed!");
                                }
                            }
                            const ret = originalMethod.apply(this, args);
                            this._currentMethod = undefined;
                            // clear this.ctx after the public @method call
                            if (txPreimage) {
                                this.clearCtx();
                            }
                            // update `this.entryMethodCall` iff the update flag is true & its value is undefined.
                            if (this.enableUpdateEMC && !this.entryMethodCall) {
                                const args_ = immutableArgs.map((arg, idx) => {
                                    // run access path argument's callback to get the real value
                                    const callback = traceableArgCallbacks.get(idx);
                                    if (callback)
                                        return callback();
                                    return arg;
                                });
                                this.entryMethodCall = this.encodeMethodCall(methodName, args_);
                            }
                            return ret;
                        }
                        return originalMethod.apply(this, args);
                    }
                    throw new Error(`@method decorator used on \`${this.name || this.constructor.name}#${methodName}\`, it should only be used in subclasses of \`SmartContract\` or \`SmartContractLib\``);
                };
                return wrappedMethod;
            }
        };
        return newDescriptor;
    };
}
exports.method = method;
/**
 * @ignore
 */
exports.StatePropsMetaKey = "scrypt:stateProps";
/**
 * @ignore
 */
exports.PropsMetaKey = "scrypt:props";
/**
 * Indicates whether the property is an property of a contract, and ordinary class properties cannot be accessed in contract methods
 * @category decorator
 * @param state - Whether the property is a property of a stateful contract
 */
function prop(state = false) {
    return function (target, propertyName) {
        if (state) {
            let stateProps = (Reflect.getMetadata(exports.StatePropsMetaKey, target) || []).concat(propertyName);
            Reflect.defineMetadata(exports.StatePropsMetaKey, stateProps, target);
        }
        let props = (Reflect.getMetadata(exports.PropsMetaKey, target) || []).concat(propertyName);
        Reflect.defineMetadata(exports.PropsMetaKey, props, target);
    };
}
exports.prop = prop;
//# sourceMappingURL=decorators.js.map