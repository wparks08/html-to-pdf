import { config } from "dotenv";
import "express-async-errors";
import { app } from "./app";

config();

const PORT = process.env.PORT || 7330;

app.listen(PORT, () => {
    console.log(`Application listening on PORT ${PORT}`);
});
