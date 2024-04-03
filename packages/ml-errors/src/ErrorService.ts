import { ErrorManager } from './ErrorManager'

/**
 * 报错服务, 注册一些默认服务，用户也可自行注册错误行为
 */
export const ErrorService = ErrorManager;

export {
  CustomError,
  ValidationError,
  AuthError,
  HttpError,
  SupportError,
  CustomErrorTypes
} from './CustomError'

export {
  ErrorHandler
} from './ErrorHandler'
