import { AbstractError } from "./abstract-error";

export class PDFCreationError extends AbstractError {
    statusCode = 500;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, PDFCreationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
