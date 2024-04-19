/**
 * 对外的IO函数
 */
export interface IOFunction<T extends any = any, Args extends any[] = any[]> {
  (...args: Args): T | Promise<T>;
}
