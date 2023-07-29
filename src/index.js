import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import AppConfig from "./config/AppConfig.js";
import dbConnect from "./db/index.js";
import logger from "./utils/logger.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectRedis from "./config/redis.config.js";
import swaggerConfig from "./config/swaggerConfig.js";

const { PORT } = AppConfig;

const app = express();

// db connection
await dbConnect().catch((error) => {
    logger.error(error);
    process.exit(1);
});

connectRedis();

// middlewares
morgan.token("customDate", () => {
    const currentDate = new Date().toISOString();
    return currentDate;
});
const logFormat =
    ":customDate :method :url :status :res[content-length] - :response-time ms";
app.use(morgan(logFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use("/api", routes);

app.get("/", (_req, res) => {
    res.status(200).json({ success: true, message: "Welcome to API" });
});

app.all("*", (req, res, _next) => {
    res.status(404).json({ success: false, error: "Page Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on  http://localhost:${PORT}`);
});
