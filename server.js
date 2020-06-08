require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { convertRouter } = require("./routes/convert");
const errorHandler = require("./middlewares/error-handler");
const NotFoundError = require("./errors/not-found-error");

const app = express();

const PORT = process.env.PORT || 7330;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: process.env.ORIGINS.split(","), credentials: true }));

app.use(convertRouter);

// It's a one route app right now, so this probably isn't necessary
// thought it would be good practice though
app.all("*", () => {
    throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Application listening on PORT ${PORT}`);
});
