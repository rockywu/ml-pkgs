/**
 * 一个可以调度的
 */
export interface IOFunction<T extends any, Args extends any[] = any[]> {
  (...args: Args): Promise<T>;
}

export interface IORetryError extends Error {
  maxRetry: number;
}

