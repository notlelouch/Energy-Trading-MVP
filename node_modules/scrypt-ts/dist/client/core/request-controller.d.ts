import { Config } from './config';
import { bsv } from "scryptlib";
import { LoggerController } from './logger-controller';
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface RequestOptions {
    pathPattern: string;
    method: RequestMethod;
    data?: Record<string, any>;
    headers?: Record<string, string>;
}
export interface RequestConfig {
    apiKey: string;
    network?: bsv.Networks.Network;
    timeout?: number;
    maxRetries?: number;
}
export declare class RequestController {
    private readonly _config;
    private readonly _logger;
    constructor(_config: Config, _logger: LoggerController);
    request<JSONResponse>(requestOpts: RequestOptions): Promise<JSONResponse>;
    get network(): bsv.Networks.Network;
    get apiKey(): string;
    get baseUrl(): string;
    static getUrl(baseUrl: string, pathPattern: string, data?: Record<string, any>): string;
}
