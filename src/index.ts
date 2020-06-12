import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { convertRouter } from "./routes/convert";

config();

const app = express();

const PORT = process.env.PORT || 7330;
const origins = process.env.ORIGINS?.split(",") || ["http://localhost"];
const corsOptions: CorsOptions = {
    origin: origins,
    credentials: true,
};

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

app.use(cors(corsOptions));

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
