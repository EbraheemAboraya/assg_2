const { createLogger, transports, format } = require("winston");

const { combine, timestamp, simple } = format;

const logger = createLogger({
    level:"info",
    format: combine(
        timestamp(),
        simple()
    ),
    transports: [
        new transports.File({
            filename: "logger/process.log",
            level: "info",
        }),
    ],
});

module.exports=logger;

