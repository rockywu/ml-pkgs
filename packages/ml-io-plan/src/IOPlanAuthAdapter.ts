/**
 * IO Auth Plan 适配器,
 * 用于解决token热刷新场景
 * 为什么要设计这个场景，当APP应用或者游览器应用token过期后，需要换取新的token，让用户无感体验
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IORequestAuthHandle, PromiseType, IOPlanAuthError, IOPlanAuthOptions } from './interface';

/**
 * 所有Io请求将通过该适配器进行发送,只描述请求发起
 */
export class IOPlanAuthAdapter<T, Args extends any[] = any[]> {

  /**
   * 判断是否需要直接认证
   */
  private shouldRequestAuth: boolean = false;

  private requestAuthPromise: PromiseType<void> = null;

  /**
   * 
   * @param ioRequestHandle 认证请求句柄auth权限, IORequestAuthHandle 实现接口
   * @param ioOptions 认证计划配置 {
      initialShouldRequestAuth?: boolean
   * }
   */
  constructor(public readonly ioRequestHandle: IORequestAuthHandle<T, Args>, ioOptions?: IOPlanAuthOptions) {
    this.shouldRequestAuth = !!ioOptions?.initialShouldRequestAuth;
  }

  /**
   * 尝试发起
   */
  private requestAuthNeeded() {
    //若已经发起过
    if (this.requestAuthPromise === null) {
      this.requestAuthPromise = this.ioRequestHandle.requestAuth();
    }
    return this.requestAuthPromise;
  }

  /**
   * 发起IO请求
   * @param args 
   * @returns 
   */
  async execute(...args: Args): Promise<T> {
    if (this.shouldRequestAuth) {
      //尝试等待
      try {
        await this.requestAuthNeeded();
        this.requestAuthPromise = null;
        this.shouldRequestAuth = false;
      } catch (e) {
        this.requestAuthPromise = null;
        throw e;
      }
    }
    let res;
    try {
      res = await this.ioRequestHandle.request(...args);
    } catch (e: any | IOPlanAuthError) {
      if (e.name === 'IOPlanAuthError') {
        //当出现过期异常，则重新请求token
        this.shouldRequestAuth = true;
        res = await this.execute(...args);
      } else {
        throw e;
      }
    }
    //否则返回成功值
    return res;
  }
}

