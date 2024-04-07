export class ErrorHandler {
    constructor() {
        this.priority = 0;
    }
    action(err) {
        console.log("default action: ", err);
    }
    match(err) {
        console.log("default match: ", err);
        return true;
    }
}
//# sourceMappingURL=ErrorHandler.js.map