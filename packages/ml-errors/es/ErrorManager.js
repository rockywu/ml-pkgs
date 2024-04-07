export class ErrorManagerFactory {
    constructor() {
        this.handlers = [];
    }
    get currentError() {
        return this._currentError;
    }
    register(handler) {
        if (!handler) {
            return;
        }
        this.handlers = [].concat(this.handlers, handler);
        this.handlers.sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0));
    }
    trigger(err) {
        this._currentError = err;
        const handler = this.handlers.find((h) => h.match(err)) || (this.handlers.filter((h) => Number(h.priority) < 0).slice(-1)[0]);
        if (!handler) {
            console.log("error handler no found: ", err);
            return;
        }
        try {
            handler.action(err);
        }
        catch (e) {
            console.log("error trigger exception: ", e);
        }
    }
    onError(e) {
        if (!e || !e.error) {
            return;
        }
        const { error } = e;
        if (error.hasBeenCaught !== undefined) {
            return;
        }
        error.hasBeenCaught = true;
        this.trigger(error);
    }
    onUnhandledRejection(e) {
        if (!e || !e.reason) {
            return;
        }
        const { reason: error } = e;
        this.trigger(error);
    }
}
export const ErrorManager = new ErrorManagerFactory();
//# sourceMappingURL=ErrorManager.js.map