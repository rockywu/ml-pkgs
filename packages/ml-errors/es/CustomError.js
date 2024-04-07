export const CustomErrorTypes = {
    CustomError: 'CustomError',
    ValidationError: 'ValidationError',
    AuthError: 'AuthError',
    HttpError: 'HttpError',
    SupportError: 'SupportError'
};
export class CustomError extends Error {
    constructor(message, data) {
        super(message);
        this.name = CustomErrorTypes.CustomError;
        this.data = data;
    }
}
export class ValidationError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = CustomErrorTypes.ValidationError;
    }
}
export class AuthError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = CustomErrorTypes.AuthError;
    }
}
export class HttpError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = CustomErrorTypes.HttpError;
    }
}
export class SupportError extends CustomError {
    constructor() {
        super(...arguments);
        this.name = CustomErrorTypes.SupportError;
    }
}
//# sourceMappingURL=CustomError.js.map