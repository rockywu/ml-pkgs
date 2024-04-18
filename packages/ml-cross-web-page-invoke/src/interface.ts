/**
 * interface
 */
export type IMessage<T extends any = any> = {
    event: string,
    message: T
}

export interface ReceiveFunction<T extends any = any> {
    (event: IMessage['event'], message: IMessage<T>['message']): void
}

export interface ICrossHander {
    attach(callback: ReceiveFunction): void;
    send(message: string): void;
}
