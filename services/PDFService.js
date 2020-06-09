const puppeteer = require("puppeteer");

module.exports = class PDFService {
    static async getPDF(url, cookies) {
        const { JSESSIONID } = cookies;

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setCookie({ name: "JSESSIONID", value: JSESSIONID, url: url });
        await page.goto(url, { waitUntil: "networkidle0" });
        return await page.pdf({
            printBackground: true,
            margin: {
                top: "0.25 in",
                right: "0.5 in",
                bottom: "0.25 in",
                left: "0.5 in",
            },
        });
    }
};
