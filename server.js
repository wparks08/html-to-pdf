require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { convertRouter } = require("./routes/convert");

const app = express();

const PORT = process.env.PORT || 7330;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: process.env.ORIGINS.split(","), credentials: true }));

app.use(convertRouter);

app.listen(PORT, () => {
    console.log(`Application listening on PORT ${PORT}`);
});
