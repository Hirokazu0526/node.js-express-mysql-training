const path = require("path");
const LOG_ROOT_DIR = process.env.LOG_ROOT_DIR || path.join(__dirname, "../logs");

module.exports = {
  appenders: {
    ConsolelogAppender: {
      type: "console"
    },
    ApplicationLogAppender: {
      type: "dateFile",
      filename: path.join(LOG_ROOT_DIR, "./application.log"),
      pattern: "yyyyMMdd",
      numBackups: 7,
    },
    AccessLogAppender: {
      type: "dateFile",
      filename: path.join(LOG_ROOT_DIR, "./access.log"),
      pattern: "yyyyMMdd",
      numBackups: 7
    }
  },
  categories:{
    "default": {
      appenders: ["ConsolelogAppender"],
      level: "ALL"
    },
    "application": {
      appenders: [
        "ApplicationLogAppender",
        "ConsolelogAppender"
      ],
      level: "INFO"
    },
    "access": {
      appenders: [
        "AccessLogAppender",
        "ConsolelogAppender"
      ],
      level: "INFO"
    }
  }
};