"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerController = void 0;
const LoggerLevelMap = {
    verbose: 0,
    debug: 1,
    info: 2,
    warning: 3,
    error: 4,
    off: 5,
};
var LogConfigKeys;
(function (LogConfigKeys) {
    LogConfigKeys["logLevel"] = "logLevel";
})(LogConfigKeys || (LogConfigKeys = {}));
class LoggerController {
    constructor(config) {
        this.config = config;
    }
    logLevel() {
        return this.config.get(LogConfigKeys.logLevel, 'info');
    }
    verbose(moduleName, message, ...args) {
        this._log('verbose', moduleName, message, ...args);
    }
    debug(moduleName, message, ...args) {
        this._log('debug', moduleName, message, ...args);
    }
    info(moduleName, message, ...args) {
        this._log('info', moduleName, message, ...args);
    }
    warning(moduleName, message, ...args) {
        this._log('warning', moduleName, message, ...args);
    }
    error(moduleName, message, ...args) {
        this._log('error', moduleName, message, ...args);
    }
    _log(logLevel, moduleName, message, ...args) {
        const configLevel = LoggerLevelMap[this.logLevel()];
        const level = LoggerLevelMap[logLevel];
        if (level < configLevel) {
            return;
        }
        const prefix = `[${logLevel.toUpperCase()}][#${moduleName}]: `;
        switch (logLevel) {
            case 'verbose':
            case 'debug':
                console.debug(prefix, message, ...args);
                break;
            case 'info':
                console.log(prefix, message, ...args);
                break;
            case 'warning':
                console.warn(prefix, message, ...args);
                break;
            case 'error':
                console.error(prefix, message, ...args);
        }
    }
}
exports.LoggerController = LoggerController;
//# sourceMappingURL=logger-controller.js.map