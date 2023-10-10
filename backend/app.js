/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));
const { login, createUser } = require(path.join(
  __dirname,
  'controllers',
  'users.js',
));

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

app.use(cardsRouter);

app.use(usersRouter);

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Ocurrió un error interno';
  res.status(status).json({ message });
});

mongoose.connect('mongodb://127.0.0.1:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  app.listen(PORT, () => {});
});
