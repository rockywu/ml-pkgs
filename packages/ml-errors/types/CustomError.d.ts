import { ICustomError } from "./interface";
export declare const CustomErrorTypes: {
    [key: string]: string;
};
export declare class CustomError<T = any> extends Error implements ICustomError<T> {
    name: string;
    data: T;
    constructor(message?: string, data?: T);
}
export declare class ValidationError extends CustomError {
    name: string;
}
export declare class AuthError extends CustomError {
    name: string;
}
export declare class HttpError extends CustomError {
    name: string;
}
export declare class SupportError extends CustomError {
    name: string;
}
