const AbstractError = require("./abstract-error");

module.exports = class NotFoundError extends AbstractError {
    constructor() {
        super("Not found");
        this.statusCode = 404;
    }

    serializeErrors() {
        return [{ message: "Not found" }];
    }
};
