"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor() {
        this.options = new Map();
        this.isInitialized = false;
    }
    get(name, defaultValue) {
        if (!this.isInitialized) {
            throw new Error('Config is not initialized');
        }
        const option = this.options.get(name);
        if (!option && defaultValue === undefined) {
            throw new Error(`Config option ${name} not found`);
        }
        return option || defaultValue;
    }
    set(name, value) {
        this.options.set(name, value);
    }
    finishInit() {
        this.isInitialized = true;
    }
}
exports.Config = Config;
//# sourceMappingURL=config.js.map