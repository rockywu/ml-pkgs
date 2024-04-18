/**
 * interface
 */
export type IMessage<T extends any = any> = {
    event: string,
    message: T
}

export interface ICallback<T extends any = any> {
    (message: IMessage<T>['message'], event: IMessage['event']): void
}

export interface ICrossHander {
    attach(callback: (message: string) => void): void;
    send(message: string): void;
}
