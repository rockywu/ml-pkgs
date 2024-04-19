/**
 * IO Auth Plan 适配器,
 * 用于解决token热刷新场景
 * 为什么要设计这个场景，当APP应用或者游览器应用token过期后，需要换取新的token，让用户无感体验
 */

import { IOFunction } from "./interface";

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
  private isTokenExpired: boolean = false;

  private requestAuthPromise: Promise<any> = null;

  /**
   * 
   * @param requestAuth 获取auth权限
   */
  constructor(private requestAuth: IOFunction, private ioFunction: IOFunction<T, Args>) { }

  /**
   * 尝试发起
   */
  public requestAuthNeeded() {
    //若已经发起过
    if (this.requestAuthPromise === null) {
      this.requestAuthPromise = this.requestAuth()
    }
    return this.requestAuthPromise;
  }

  async executeWithRequest(...args: Args): Promise<T> {
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
      res = await this.ioFunction(...args)
    } catch (e: any | IOAuthPlanExpiredError) {
      if (e.name === 'IOAuthPlanExpiredError') {
        //当出现过期异常，则重新请求token
        this.isTokenExpired = true;
        res = await this.executeWithRequest(...args);
      } else {
        throw e;
      }
    }
    //否则返回成功值
    return res;
  }
}

