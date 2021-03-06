import { AbstractError } from "./abstract-error";

export class NotFoundError extends AbstractError {
    statusCode: number = 404;

    constructor() {
        super("Not found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: "Not found" }];
    }
}
