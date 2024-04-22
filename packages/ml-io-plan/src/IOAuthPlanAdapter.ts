/**
 * IO Auth Plan 适配器,
 * 用于解决token热刷新场景
 * 为什么要设计这个场景，当APP应用或者游览器应用token过期后，需要换取新的token，让用户无感体验
 */

import { IORequestAuthHandle } from "./interface";

export class IOAuthPlanExpiredError extends Error {
  name = 'IOAuthPlanExpiredError'
}


/**
 * 所有Io请求将通过该适配器进行发送,只描述请求发起
 */
export class IOAuthPlanAdapter<T, Args extends any[] = any[]> {

  /**
   * 过期时间完全由适配器返回异常
   */
  private isTokenExpired: boolean = true;

  private requestAuthPromise: Promise<any> = null;

  /**
   * 
   * @param ioAuthHandle 认证请求句柄auth权限
   */
  constructor(private ioAuthHandle: IORequestAuthHandle) { }

  /**
   * 尝试发起
   */
  public requestAuthNeeded() {
    //若已经发起过
    if (this.requestAuthPromise === null) {
      this.requestAuthPromise = this.ioAuthHandle.requestAuth()
    }
    return this.requestAuthPromise;
  }

  /**
   * 发起IO请求
   * @param args 
   * @returns 
   */
  async execute(...args: Args): Promise<T> {
    if (this.isTokenExpired) {
      //尝试等待
      try {
        await this.requestAuthNeeded();
        this.requestAuthPromise = null;
        this.isTokenExpired = false;
      } catch (e) {
        this.requestAuthPromise = null;
        throw e;
      }
    }
    let res;
    try {
      res = await this.ioAuthHandle.request(...args)
    } catch (e: any | IOAuthPlanExpiredError) {
      if (e.name === 'IOAuthPlanExpiredError') {
        //当出现过期异常，则重新请求token
        this.isTokenExpired = true;
        res = await this.execute(...args);
      } else {
        throw e;
      }
    }
    //否则返回成功值
    return res;
  }

  /**
   * 发起IO请求
   * @param args 
   * @deprecated 将在0.1.0版本以后废弃,统一使用execute
   * @returns 
   */
  executeWithRequest(...args: Args): Promise<T> {
    console?.warn(`Function "executeWithRequest" will be deprecated after version 0.1.0, please use an alternative function "execute"`)
    return this.execute(...args)
  }
}

