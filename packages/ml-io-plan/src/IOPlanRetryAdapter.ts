/**
 * IO重发尝试
 */

import { delay } from './utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IOPlanNetworkError, IORequestHandle } from './interface';

/**
 * IO 重试计划, 默认当出现IOPlanNetworkError 时才发起重试，其他类型错误不错处理
 */
export class IOPlanRetryAdapter<T, Args extends any[] = any[]> {

  /**
   * 通用适配器
   * @param ioRequestHandle  请求句柄 请实现接口 IORequestHandle
   * @param maxRetries 重试次数 默认3次
   * @param retryInterval  next等待延迟 默认300ms
   */
  constructor(
    public readonly ioRequestHandle: IORequestHandle<T, Args>,
    public readonly maxRetries: number = 3,
    public readonly retryInterval: number = 300
  ) {
  }

  /**
   * 发起IO请求
   * @param args 
   * @returns 
   */
  public async execute(...args: Args): Promise<T> {
    let retries = 0;
    let lastError: Error = null;
    do {
      //在第二次之后开始尝试启动
      if (retries > 0) {
        await delay(this.retryInterval);
      }
      try {
        return await this.ioRequestHandle.request(...args);
      } catch (e: any | IOPlanNetworkError) {
        lastError = e;
        if (e.name === 'IOPlanNetworkError') {
          //网络异常时才重新进入循环
          console.log(`IO operation failed, retrying... (Attempt ${retries + 1}/${this.maxRetries})`);
          retries++;
        } else {
          throw e;
        }
      }
    } while (retries < this.maxRetries);
    console.log(`IO operation failed after ${this.maxRetries} retries.`);
    throw lastError;
  }
}