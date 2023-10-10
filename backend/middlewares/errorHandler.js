// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Ocurrió un error interno';
  res.status(status).json({ message });
};
