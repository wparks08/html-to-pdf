const AbstractError = require("./abstract-error");

module.exports = class ValidationError extends AbstractError {
    constructor(errors) {
        super();
        this.statusCode = 400;
        this.errors = errors;
    }

    serializeErrors() {
        return this.errors.map((err) => {
            return { message: err.msg, field: err.param };
        });
    }
};
