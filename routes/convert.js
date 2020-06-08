const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const { body, cookie, validationResult } = require("express-validator");
const ValidationError = require("../errors/validation-error");

router.post(
    "/convert",
    [
        body("url", "'url' not found in request body").isURL(),
        cookie("JSESSIONID", "session id not found - must be logged in").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (errors) {
            throw new ValidationError(errors.array());
        }

        const { url } = req.body;
        const { JSESSIONID } = req.cookies;

        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setCookie({ name: "JSESSIONID", value: JSESSIONID, url: url });
            await page.goto(url, { waitUntil: "networkidle0" });
            const pdf = await page.pdf({
                printBackground: true,
                margin: {
                    top: "0.25 in",
                    right: "0.5 in",
                    bottom: "0.25 in",
                    left: "0.5 in",
                },
            });

            res.status(200).set("Content-Type", "application/pdf").send(pdf);
        } catch (e) {
            console.log(e);
            res.status(500).send({
                errors: e,
            });
        }
    }
);

module.exports = { convertRouter: router };
