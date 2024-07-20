"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerReader = exports.INDEX_FILE_NAME = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
exports.INDEX_FILE_NAME = 'scrypt.index.json';
/**
 * @ignore
 */
class IndexerReader {
    constructor(pathParam) {
        this.symbolPaths = new Map();
        this.filePath = pathParam;
        this.load();
    }
    load() {
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`index file not exist: ${this.filePath}`);
        }
        let content = JSON.parse(fs.readFileSync(this.filePath).toString());
        if (!content.scryptBase) {
            throw new Error(`missing \`scryptBase\` in index file ${this.filePath}`);
        }
        this.scryptBasePath = content.scryptBase;
        if (!content.bindings) {
            throw new Error(`missing \`bindings\` in index file ${this.filePath}`);
        }
        content.bindings.forEach(binding => {
            if (binding.symbol && binding.path) {
                this.symbolPaths.set(binding.symbol, binding.path);
            }
        });
    }
    getRelativePath(symbol) {
        return this.symbolPaths.get(symbol);
    }
    getFullPath(symbol) {
        const relativePath = this.getRelativePath(symbol);
        if (!relativePath) {
            return undefined;
        }
        ;
        return path.join(path.dirname(this.filePath), this.scryptBasePath, relativePath);
    }
    static queryIndexFile(fromPath, toPath) {
        let searchDir = fromPath;
        toPath = toPath === undefined ? process.cwd() : toPath;
        const isSamePath = (pathA, pathB) => {
            return path.resolve(pathA).toLowerCase() == path.resolve(pathB).toLowerCase();
        };
        while (true) {
            let indexFile = path.join(searchDir, exports.INDEX_FILE_NAME);
            if (fs.existsSync(indexFile)) {
                return indexFile;
            }
            const parentDir = path.join(searchDir, '..');
            if (isSamePath(searchDir, toPath) || isSamePath(searchDir, parentDir)) {
                break;
            }
            searchDir = parentDir;
        }
        let indexFile = path.join(toPath, exports.INDEX_FILE_NAME);
        if (fs.existsSync(indexFile)) {
            return indexFile;
        }
        return undefined;
    }
    query(symbol, includeBase = false) {
        const sPath = this.symbolPaths.get(symbol);
        return sPath && includeBase ? path.join(this.scryptBasePath, sPath) : sPath;
    }
}
exports.IndexerReader = IndexerReader;
//# sourceMappingURL=indexerReader.js.map