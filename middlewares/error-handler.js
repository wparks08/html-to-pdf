const AbstractError = require("../errors/abstract-error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof AbstractError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [
            {
                message: "Something went wrong.",
            },
        ],
    });
};

module.exports = errorHandler;
