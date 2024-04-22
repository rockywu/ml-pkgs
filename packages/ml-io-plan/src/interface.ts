/**
 * 对外的IO函数
 */
export interface IOFunction<T extends any = any, Args extends any[] = any[]> {
  (...args: Args): T | Promise<T>;
}


export interface IORequestHandle<T extends any = any, Args extends any[] = any[]> {
  request: IOFunction<T, Args>
}

export interface IORequestAuthHandle<T extends any = any, Args extends any[] = any[]> extends IORequestHandle<T, Args> {
  requestAuth: IOFunction<T, []>
}