import { AbstractError } from "./abstract-error";

module.exports = class PDFGenerationError extends AbstractError {
    statusCode = 500;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, PDFGenerationError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
};
