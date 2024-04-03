import { ICustomError } from "./interface";


export const CustomErrorTypes: {[key: string]: string} = {
  CustomError: 'CustomError',
  ValidationError: 'ValidationError',
  AuthError: 'AuthError',
  HttpError: 'HttpError',
  SupportError: 'SupportError'
} as const;

/**
 * 自定义异常
 */
export class CustomError<T = any> extends Error implements ICustomError<T> {
  name = CustomErrorTypes.CustomError
  data: T;
  constructor(message?: string, data?: T) {
    super(message);
    this.data = data as T;
  }
}

/**
 * 表单校验异常
 */
export class ValidationError extends CustomError {
  name = CustomErrorTypes.ValidationError
}

/**
 * 认证异常
 */
export class AuthError extends CustomError {
  name = CustomErrorTypes.AuthError
}

/**
 * 网络异常
 */
export class HttpError extends CustomError {
  name = CustomErrorTypes.HttpError
}

/**
 * 系统支持异常
 */
export class SupportError extends CustomError {
  name = CustomErrorTypes.SupportError
}
