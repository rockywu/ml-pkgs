/**
 * 错误管理器接口
 */
export interface IErrorManager {
  /**
   * 注册异常处理方法
   * @param handler
   */
  register(handler: IErrorHandler<Error> | IErrorHandler<Error>[]);
  trigger(err: Error);
  currentError: Error;
  onError(e): void;
  onUnhandledRejection(e): void;
}

export interface IErrorHandler<T> {
  /**
   * 优先级 -1 最低优先级
   */
  priority?: number;
  /**
   * 检测是否匹配
   * @param data
   */
  match(data: T): boolean;
  /**
   * 匹配时执行操作
   * @param data
   */
  action(data: T): any;
}


export interface ICustomError<T = any> extends Error {
  data?: T;
}

