"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwUnInitializing = void 0;
function throwUnInitializing(name) {
    throw new Error(`'${name}.compile' or '${name}.loadArtifact' should be called before initializing any instance!`);
}
exports.throwUnInitializing = throwUnInitializing;
//# sourceMappingURL=error.js.map