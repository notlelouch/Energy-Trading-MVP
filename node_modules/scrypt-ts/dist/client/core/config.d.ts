export declare class Config {
    private options;
    private isInitialized;
    get<T>(name: string, defaultValue?: T): T;
    set<T>(name: string, value: T): void;
    finishInit(): void;
}
