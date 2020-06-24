# HTML to PDF Converter

The HTML to PDF converter is a single-endpoint API for converting a web page into a downloadable PDF file. It works by
making a POST request to the `/convert` endpoint with a JSON object containing a `url` property. The service will call the
supplied URL, convert the resulting HTML to a PDF file, and send it back to the caller.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To get started, clone this repository to your local system.

```
git clone https://github.com/wparks08/html-to-pdf.git
```

You must also have the following installed on your system to run the application:
```text
Node
```

### Installing

First, install node packages.

```shell script
npm i
# Or
npm install
```

Next, create a `.env` file in the root directory of the project, and supply the following variables:
`PORT` (optional) - default is 7330
`ORIGINS` (required; CORS) - specify fully qualified URLs here, where the software will be deployed (e.g., `http://localhost:7330`). Multiple origins can be listed, separated by a comma (,).

To make sure everything is set up correctly, `npm start` from the root directory. This will run ts-node-dev, and start
the Express server running on port 7330

The easiest way to test out the endpoint is to use an API client such as Postman. Send a request to `http://localhost:7330/convert`
with the following JSON attached:
```json
{
  "url": "https://www.google.com"
}
```

The response should contain a copy of the requested page, converted into a PDF.

*Note: The software will convert the requested page using CSS Print Media by default.

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime
* [NPM](https://npmjs.com) - Dependency Management
* [Typescript](https://www.typescriptlang.org/) - Typed superset of JavaScript
* [Puppeteer](https://www.npmjs.com/package/puppeteer) - High level, headless API for browser automation (Chrome/Chromium)

## Authors

* **Will Parks** - [wparks08](https://github.com/wparks08)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
