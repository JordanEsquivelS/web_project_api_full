const winston = require('winston');

const requestLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'request.log' })],
});

const errorLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'error.log' })],
});

module.exports = {
  requestLogger,
  errorLogger,
};
