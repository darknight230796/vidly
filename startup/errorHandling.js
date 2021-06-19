const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");
module.exports = () => {
  winston.add(new winston.transports.File({ filename: "logFile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost/vidly",
      level: "info",
    })
  );
  winston.add(new winston.transports.Console({colorize: true, prettyPrint:true}));
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });
  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });
};
