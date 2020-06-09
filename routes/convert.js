const express = require("express");
const router = express.Router();
const { body, cookie, validationResult } = require("express-validator");
const ValidationError = require("../errors/validation-error");
const PDFCreationError = require("../errors/pdf-creation-error");
const PDFService = require("../services/PDFService");

router.post(
    "/convert",
    [
        body("url", "url missing or invalid").exists(),
        cookie("JSESSIONID", "session id not found - must be logged in").exists(),
    ],
    async (req, res) => {
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

module.exports = { convertRouter: router };
