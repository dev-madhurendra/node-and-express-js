const winston = require('winston');

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: logFormat,
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Console transport
    new winston.transports.File({ filename: 'logs/app.log', format: logFormat }), // File transport
  ],
});

module.exports = logger;
