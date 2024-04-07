import { IErrorHandler } from "./interface";
export declare class ErrorHandler<T extends Error> implements IErrorHandler<T> {
    priority: number;
    action(err: T): any;
    match(err: T): boolean;
}
