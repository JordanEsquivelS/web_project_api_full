/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const cardsRouter = require(path.join(__dirname, 'routes', 'cards.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6504b8c73db08aa6954905b4',
  };
  next();
});

app.use(cardsRouter);

app.use(usersRouter);

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
