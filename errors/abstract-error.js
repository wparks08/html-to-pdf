class AbstractError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

module.exports = AbstractError;
