// eslint-disable-next-line no-unused-vars
const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Ocurrió un error interno';

  const errorMessages = {
    'custom.link': 'Link inválido',
    'custom.cardId': 'Id inválido o no encontrado'
  };

  if (isCelebrateError(err)) {
    status = 400;
    const errorDetail = (err.details.get('body') || err.details.get('params') || {}).details?.[0];

    message = errorMessages[errorDetail?.type] || "Validation failed";
  }

  res.status(status).json({ message });
};
