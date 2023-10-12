// eslint-disable-next-line no-unused-vars
const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  const status = err.status || 500;

  let message = err.message || 'Ocurrió un error interno';

  if (isCelebrateError(err)) {
    if (
      err.details.get('body') && err.details.get('body').details[0] && err.details.get('body').details[0].type === 'custom.link'
    ) {
      message = 'Link inválido';
    }
  }
  res.status(status).json({ message });
};
