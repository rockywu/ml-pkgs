/**
 * IO重发尝试
 */

import { delay } from './utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IOPlanNetworkError, IOPlanRetryOptions, IORequestHandle } from './interface';

/**
 * IO 重试计划, 默认当出现IOPlanNetworkError 时才发起重试，其他类型错误不错处理
 */
export class IOPlanRetryAdapter<T, Args extends any[] = any[]> {

  /**
   * 选项配置
   */
  ioOptions: IOPlanRetryOptions = null;

  /**
   * 通用适配器
   * @param ioRequestHandle  请求句柄 请实现接口 IORequestHandle
   * @param ioOptions 请求配置  {
      maxRetries?: number,
      retryInterval?: number,
      networkErrorCallback?: (times: number) => void
    }
   */
  constructor(
    public readonly ioRequestHandle: IORequestHandle<T, Args>,
    ioOptions?: IOPlanRetryOptions
  ) {
    this.ioOptions = { ...{ maxRetries: 3, retryInterval: 300, networkErrorCallback: () => { } }, ...ioOptions };
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
        await delay(this.ioOptions.retryInterval);
      }
      try {
        return await this.ioRequestHandle.request(...args);
      } catch (e: any | IOPlanNetworkError) {
        lastError = e;
        if (e.name === 'IOPlanNetworkError') {
          //网络异常时才重新进入循环
          console.log(`IO operation failed, retrying... (Attempt ${retries + 1}/${this.ioOptions.maxRetries})`);
          retries++;
          //支持网络异常等待
          if (this.ioOptions?.networkErrorCallback) {
            await this.ioOptions?.networkErrorCallback(retries);
          }
        } else {
          throw e;
        }
      }
    } while (retries < this.ioOptions.maxRetries);
    console.log(`IO operation failed after ${this.ioOptions.maxRetries} retries.`);
    throw lastError;
  }
}