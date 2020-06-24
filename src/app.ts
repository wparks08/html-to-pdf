import express from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { convertRouter } from "./routes/convert";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

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

export { app };
