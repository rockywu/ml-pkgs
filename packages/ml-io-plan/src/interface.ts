/**
 * 对外的IO函数
 */
export type PromiseType<T> = T | Promise<T>;


export interface IORequestHandle<T, Args extends any[] = any[]> {
  request(...args: Args): PromiseType<T>
}

export interface IORequestAuthHandle<T, Args extends any[] = any[]> extends IORequestHandle<T, Args> {
  requestAuth(): PromiseType<void>
}

export interface IOPlanRetryOptions {
  maxRetries?: number,
  retryInterval?: number,
  networkErrorCallback?: (times: number) => PromiseType<void>
}

/**
 * 定义网络异常
 */
export class IOPlanNetworkError extends Error {
  name = 'IOPlanNetworkError';
}

/**
 * 定义认证异常
 */
export class IOPlanAuthError extends Error {
  name = 'IOPlanAuthError';
}