import { IErrorHandler, IErrorManager } from './interface';
export declare class ErrorManagerFactory implements IErrorManager {
    handlers: IErrorHandler<Error>[];
    get currentError(): Error;
    private _currentError;
    register(handler: IErrorHandler<Error> | IErrorHandler<Error>[]): void;
    trigger(err: Error): void;
    onError(e: any): void;
    onUnhandledRejection(e: any): void;
}
export declare const ErrorManager: ErrorManagerFactory;
