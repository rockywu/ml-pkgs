## ml-errors

> Error注册、管理、处理模块

#### 安装

`npm i @ml-pkgs/ml-errors`

#### 使用

```Demo
/**
 * 异常处理  example Error
 */
import { ErrorService, ErrorHandler, ICustomError, CustomErrorTypes, AuthError } from '@ml-pkgs/ml-errors'

/**
 * 注册登录异常
 */
export class AuthErrorHandler extends ErrorHandler<AuthError> {
  priority = 10;
  action(err: ICustomError): any {
    //自定义业务
    console.log("toast: ", err?.message);
  }

  match(err: ICustomError): boolean {
    return err?.name === CustomErrorTypes.AuthError;
  }
}

export class ToastErrorHandler extends ErrorHandler<ICustomError> {
  priority = 10;
  action(err: ICustomError): any {
    console.log("toast: ", err?.message);
  }

  match(err: ICustomError): boolean {
    return [
      CustomErrorTypes.SupportError,
      CustomErrorTypes.ValidationError,
      CustomErrorTypes.HttpError
    ].includes(err?.name)
  }
}


export class UnknownErrorHandler extends ErrorHandler<ICustomError> {
  priority = -1;

  action(err: ICustomError): any {
    console.log("toast: ", err?.message);
  }

  match(err: ICustomError): boolean {
    return true;
  }
}

ErrorService.register([
  new AuthErrorHandler(),
  new ToastErrorHandler(),
  new UnknownErrorHandler()
])


```