import { ActionResolver } from "./action-resolver";
import { Config } from "./config";
import { bsv } from "scryptlib";
import { LogConfig, LoggerController } from "./logger-controller";
import { RequestConfig, RequestController } from "./request-controller";
export interface ScryptConfig extends RequestConfig, LogConfig {
}
export declare class Core {
    readonly config: Config;
    readonly logger: LoggerController;
    readonly requestController: RequestController;
    readonly actionResolver: ActionResolver;
    readonly events: Map<string, any>;
    constructor();
    init(config: ScryptConfig): void;
    getNetWork(): bsv.Networks.Network;
    getApiKey(): string;
    getBaseUrl(): string;
}
