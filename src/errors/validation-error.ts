import { AbstractError } from "./abstract-error";
import { ValidationError as ExpressValidationError } from "express-validator";

export class ValidationError extends AbstractError {
    statusCode = 400;

    constructor(private errors: ExpressValidationError[]) {
        super("Invalid request parameters");

        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
}
