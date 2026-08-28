const pino = require("pino");
const { NODE_ENV } = require("../config/env");

const logger = pino({
    level: NODE_ENV === "production" ? "info" : "debug",
    enabled: NODE_ENV !== "test",
    transport:
        NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
                options: { colorize: true, translateTime: "SYS:standard", ignore: "pid,hostname" }
            }
            : undefined,
});

module.exports = logger;