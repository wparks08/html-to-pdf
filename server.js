const express = require("express");
const convertHTMLtoPDF = require("pdf-puppeteer");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "100000kb" }));
app.use(express.urlencoded({ extended: true, limit: "100000kb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }))
// app.options("*", cors());
app.use(cors());

app.post("/", (req, res) => {
    let options = {
        format: "Letter"
    }

    var callback = function (pdf) {
        console.log(pdf);
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdf);
    }
    console.log(req.body);
    convertHTMLtoPDF(req.body.html, callback, options);
});

app.listen(PORT, err => {
    if (err) {
        throw err;
    }

    console.log(`Application listening on PORT ${PORT}`);
});