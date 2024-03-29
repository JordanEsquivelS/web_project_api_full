/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    return res.status(403).json({
      message: 'Acceso prohibido. No se proporcionó token de autenticación.',
    });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    res
      .status(403)
      .json({ message: 'Acceso prohibido. Token inválido o expirado.' });
  }
}

module.exports = authMiddleware;
