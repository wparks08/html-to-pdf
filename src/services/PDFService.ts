import puppeteer, { DirectNavigationOptions, PDFOptions, SetCookie } from "puppeteer";

interface ExpressCookies {
    key: string;
    value: string;
}

export class PDFService {
    static async getPDF(url: string, cookies: ExpressCookies) {
        const directNavigationOptions: DirectNavigationOptions = {
            waitUntil: "networkidle0",
        };
        const pdfOptions: PDFOptions = {
            printBackground: true,
            margin: {
                top: "0.25 in",
                right: "0.5 in",
                bottom: "0.25 in",
                left: "0.5 in",
            },
        };
        const sessionCookies: SetCookie[] = this.convertCookies(cookies, url);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setCookie(...sessionCookies);
        await page.goto(url, directNavigationOptions);
        return await page.pdf(pdfOptions);
    }

    private static convertCookies(cookies: {}, url: string): { name: string; value: string; url: string }[] {
        const entries: [string, string][] = Object.entries(cookies);

        return entries.map((entry: [string, string]) => {
            return {
                name: entry[0],
                value: entry[1],
                url: url,
            };
        });
    }
}
