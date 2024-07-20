"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranspileError = void 0;
/**
 * @ignore
 * Errors that may occur when the transpiler translates sCrypt contracts.
 */
class TranspileError {
    constructor(message, srcRange) {
        this.message = message;
        this.srcRange = srcRange;
        this.srcRange.start.line++;
        this.srcRange.start.character++;
        this.srcRange.end.line++;
        this.srcRange.end.character++;
    }
}
exports.TranspileError = TranspileError;
//# sourceMappingURL=types.js.map