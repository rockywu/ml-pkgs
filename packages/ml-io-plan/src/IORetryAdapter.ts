/**
 * IO重发尝试
 */

import { IOFunction } from "./interface";
import { delay } from "./utils";

export class IORetryAdapter<T, Args extends any[] = any[]> {
  /**
   * IO函数
   */
  private ioFunction: IOFunction<T, Args>;
  /**
   * 尝试重试次数
   */
  private maxRetries: number;
  /**
   * 重试等待时间
   */
  private retryInterval: number;

  /**
   * 通用适配器
   * @param ioFunction 
   * @param maxRetries 重试次数
   * @param retryInterval  next等待延迟
   */
  constructor(ioFunction: IOFunction<T, Args>, maxRetries: number = 3, retryInterval: number = 300) {
    this.ioFunction = ioFunction;
    this.maxRetries = maxRetries;
    this.retryInterval = retryInterval;
  }

  /**
   * 发起IO请求
   * @param args 
   * @returns 
   */
  public async execute(...args: Args): Promise<T> {
    let retries = 0;
    let lastError = null;
    do {
      //在第二次之后开始尝试启动
      if (retries > 0) {
        await delay(this.retryInterval);
      }
      try {
        return await this.ioFunction(...args);
      } catch (error) {
        lastError = error;
        console.log(`IO operation failed, retrying... (Attempt ${retries + 1}/${this.maxRetries})`);
        retries++
      }
    } while (retries < this.maxRetries)
    console.log(`IO operation failed after ${this.maxRetries} retries.`)
    throw lastError;
  }

  /**
   * 发起IO请求
   * @param args 
   * @deprecated 将在0.1.0版本以后废弃,统一使用execute
   * @returns 
   */
  public  executeWithRetry(...args: Args): Promise<T> {
    console?.warn(`Function "executeWithRetry" will be deprecated after version 0.1.0, please use an alternative function "execute"`)
    return this.execute(...args)
  }
}