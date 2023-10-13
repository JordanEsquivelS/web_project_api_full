const winston = require('winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const requestLogger = winston.createLogger({
  format: logFormat,
  transports: [new winston.transports.File({ filename: 'request.log' })],
});

const errorLogger = winston.createLogger({
  format: logFormat,
  transports: [new winston.transports.File({ filename: 'error.log' })],
});

module.exports = {
  requestLogger,
  errorLogger,
};
