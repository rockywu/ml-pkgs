/**
 * 错误管理器
 */
import { IErrorHandler, IErrorManager } from './interface';

export class ErrorManagerFactory implements IErrorManager {
  /**
   * 存放注册后错误事件
   */
  handlers: IErrorHandler<Error>[] = [];

  get currentError(): Error {
    return this._currentError;
  }
  private _currentError: Error;

  /**
   * 注册错误事件
   * @param handler 
   * @returns 
   */
  register(handler: IErrorHandler<Error> | IErrorHandler<Error>[]): void {
    if (!handler) {
      return;
    }
    this.handlers = ([] as IErrorHandler<Error>[]).concat(this.handlers, handler)
    this.handlers.sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0));
  }

  trigger(err: Error) {
    this._currentError = err;
    const handler = this.handlers.find((h) => h.match(err)) || (this.handlers.filter((h) => Number(h.priority) < 0).slice(-1)[0]);
    if (!handler) {
      console.log("error handler no found: ", err);
      return;
    }
    try {
      handler.action(err);
    } catch (e) {
      console.log("error trigger exception: ", e);
    }
  }

  public onError(e: any): void {
    if (!e || !e.error) {
      return;
    }
    const { error } = e;
    // 避免react中的window.onError触发两次
    if (error.hasBeenCaught !== undefined) {
      return;
    }
    error.hasBeenCaught = true;
    this.trigger(error);
  }

  public onUnhandledRejection(e: any): void {
    if (!e || !e.reason) {
      return;
    }
    const { reason: error } = e;
    this.trigger(error);
  }

}

/**
 * 创建一个错误管理器
 */
export const ErrorManager = new ErrorManagerFactory();