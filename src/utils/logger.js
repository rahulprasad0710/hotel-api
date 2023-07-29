import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
    // level: process.env.LOG_LEVEL || "info",
    level: "error",
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
    ],
});

export default logger;