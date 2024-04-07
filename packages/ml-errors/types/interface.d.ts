export interface IErrorManager {
    register(handler: IErrorHandler<Error> | IErrorHandler<Error>[]): any;
    trigger(err: Error): any;
    currentError: Error;
    onError(e: any): void;
    onUnhandledRejection(e: any): void;
}
export interface IErrorHandler<T> {
    priority?: number;
    match(data: T): boolean;
    action(data: T): any;
}
export interface ICustomError<T = any> extends Error {
    data?: T;
}
