const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

router.post("/convert", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        res.status(403).send({
            errors: [
                {
                    message: "Request body did not contain 'url'",
                },
            ],
        });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setCookie({ name: "JSESSIONID", value: req.cookies.JSESSIONID, url: url });
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
});

module.exports = { convertRouter: router };
