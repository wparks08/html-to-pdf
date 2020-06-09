import express, { Request, Response } from "express";
import PDFService from "../services/PDFService";
import PDFCreationError from "../errors/pdf-creation-error";
import ValidationError from "../errors/validation-error";
import { body, cookie, validationResult } from "express-validator";

const router = express.Router();

router.post(
    "/convert",
    [
        body("url", "url missing or invalid").exists(),
        cookie("JSESSIONID", "session id not found - must be logged in").exists(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            throw new ValidationError(errors.array());
        }

        const { url } = req.body;

        try {
            const pdf = await PDFService.getPDF(url, req.cookies);
            res.status(200).set("Content-Type", "application/pdf").send(pdf);
        } catch (e) {
            console.log(e.stack);
            throw new PDFCreationError(e.message);
        }
    }
);

export { router as convertRouter };
