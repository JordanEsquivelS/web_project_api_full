// eslint-disable-next-line no-unused-vars
const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Ocurrió un error interno';

  const errorMessages = {
    'custom.link': 'Link inválido',
    'custom.cardId': 'Id inválido o no encontrado',
  };

  if (isCelebrateError(err)) {
    status = 400;
    const errorDetails = err.details.get('body') || err.details.get('params');
    const errorDetail = errorDetails && errorDetails.details ? errorDetails.details[0] : null;

    message = errorDetail && errorMessages[errorDetail.type]
      ? errorMessages[errorDetail.type]
      : 'Validation failed';
  }

  res.status(status).json({ message });
};
