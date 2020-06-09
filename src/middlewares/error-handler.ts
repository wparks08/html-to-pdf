import { AbstractError } from "../errors/abstract-error";
import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
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

export { errorHandler };
