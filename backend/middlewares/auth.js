const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'No se proporcionó token de autenticación.' });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);

    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido o expirado.' });
  }
}

module.exports = authMiddleware;
