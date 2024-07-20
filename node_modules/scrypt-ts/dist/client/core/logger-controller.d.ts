import { Config } from "./config";
export type LogLevel = 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'off';
export interface LogConfig {
    logLevel?: LogLevel;
}
export declare class LoggerController {
    private readonly config;
    constructor(config: Config);
    logLevel(): LogLevel;
    verbose(moduleName: string, message: string, ...args: any[]): void;
    debug(moduleName: string, message: string, ...args: any[]): void;
    info(moduleName: string, message: string, ...args: any[]): void;
    warning(moduleName: string, message: string, ...args: any[]): void;
    error(moduleName: string, message: string, ...args: any[]): void;
    private _log;
}
