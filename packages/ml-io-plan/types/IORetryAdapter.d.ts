import { IOFunction } from "./interface";
export declare class IORetryAdapter<T, Args extends any[] = any[]> {
    private ioFunction;
    private maxRetries;
    private retryInterval;
    constructor(ioFunction: IOFunction<T, Args>, maxRetries?: number, retryInterval?: number);
    executeWithRetry(...args: Args): Promise<T>;
}
