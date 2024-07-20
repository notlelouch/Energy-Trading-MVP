/**
 * @ignore
 */
export type Symbol = string & {
    __type: 'sCryptSymbol';
};
export type FilePath = string;
export type Content = {
    scryptBase: string;
    bindings: {
        symbol: Symbol;
        path: FilePath;
    }[];
};
export declare const INDEX_FILE_NAME = "scrypt.index.json";
/**
 * @ignore
 */
export declare class IndexerReader {
    filePath: string;
    scryptBasePath: string;
    symbolPaths: Map<Symbol, FilePath>;
    constructor(pathParam: FilePath);
    load(): void;
    getRelativePath(symbol: Symbol): FilePath;
    getFullPath(symbol: Symbol): FilePath | undefined;
    static queryIndexFile(fromPath: FilePath, toPath?: FilePath): FilePath | undefined;
    query(symbol: Symbol, includeBase?: boolean): FilePath | undefined;
}
