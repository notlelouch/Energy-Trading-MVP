import { BsvApi } from "./apis/bsv-api";
import { ContractApi } from "./apis/contract-api";
import { ScryptConfig } from "./core/core";
export declare const Scrypt: {
    bsvApi: BsvApi;
    contractApi: ContractApi;
    init(config: ScryptConfig): void;
    getConfig<T>(name: string, defaultValue?: T): T;
};
export { ScryptConfig } from './core/core';
export { ContractId } from './core/types';
export { LogLevel, LogConfig } from './core/logger-controller';
export { RequestConfig } from './core/request-controller';
export { ActionError } from './core/action-resolver';
export { SubScription, ContractCalledEvent, SubscribeOptions, ContractApi } from './apis/contract-api';
export { BsvApi } from './apis/bsv-api';
