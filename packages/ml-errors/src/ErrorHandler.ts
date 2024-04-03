import { IErrorHandler } from "./interface";

export class ErrorHandler<T extends Error> implements IErrorHandler<T> {

  priority: number = 0;

  action(err: T): any {
    console.log("default action: ", err);
  }

  match(err: T): boolean {
    console.log("default match: ", err);
    return true;
  }
}
