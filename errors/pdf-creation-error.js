const AbstractError = require("./abstract-error");

module.exports = class PDFGenerationError extends AbstractError {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 500;
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
};
