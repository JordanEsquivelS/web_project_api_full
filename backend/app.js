/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));
const { login, createUser } = require(path.join(
  __dirname,
  'controllers',
  'users.js',
));
const errorHandler = require(path.join(
  __dirname,
  'middlewares',
  'errorHandler.js',
));

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use((req, res, next) => {
  requestLogger.info({
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
  });
  next();
});

app.use(cardsRouter);

app.use(usersRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  errorLogger.error({
    message: err.message,
    stack: err.stack,
  });
  next(err);
});

app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${PORT}`);
  });
});
