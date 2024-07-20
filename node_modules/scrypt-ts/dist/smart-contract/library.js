"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractLib = void 0;
require("reflect-metadata");
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
class SmartContractLib {
    constructor(...args) {
        this.args = [];
        this.args = args;
    }
    /**
     *
     * @ignore
     */
    getArgs() {
        return (this.args || []).map(arg => {
            if (arg instanceof SmartContractLib) {
                return arg.getArgs();
            }
            return arg;
        });
    }
    /**
     *
     * @ignore
     */
    getState() {
        return Object.keys(this).reduce((acc, key) => {
            if (typeof this[key] === 'bigint' || typeof this[key] === 'boolean' || typeof this[key] === 'string') {
                return Object.assign(acc, {
                    [key]: this[key]
                });
            }
            else if (this[key] instanceof SmartContractLib) {
                return Object.assign(acc, {
                    [key]: this[key].getState()
                });
            }
            else {
                return acc;
            }
        }, {});
    }
}
exports.SmartContractLib = SmartContractLib;
//# sourceMappingURL=library.js.map