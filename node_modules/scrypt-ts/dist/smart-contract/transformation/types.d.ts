/**
 * @ignore
 */
export interface LineAndCharacter {
    /** 0-based. */
    line: number;
    character: number;
}
/**
 * @ignore
 */
export interface Range {
    fileName: string;
    start: LineAndCharacter;
    end: LineAndCharacter;
}
/**
 * @ignore
 * Errors that may occur when the transpiler translates sCrypt contracts.
 */
export declare class TranspileError {
    message: string;
    srcRange: Range;
    constructor(message: string, srcRange: Range);
}
/**
 * @ignore
 */
export type TransformationResult = {
    success: boolean;
    errors: TranspileError[];
    scryptfile: string;
    sourceMapFile: string;
    ctxMethods: string[];
};
