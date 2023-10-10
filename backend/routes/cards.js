/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');

const authMiddleware = require(path.join(
  __dirname,
  '..',
  'middlewares',
  'auth',
));

const cardController = require(path.join(
  __dirname,
  '..',
  'controllers',
  'cards',
));

const router = express.Router();

router.get('/cards', authMiddleware, cardController.getCards);
router.get('/cards/:_id', authMiddleware, cardController.getCardById);
router.post('/cards', authMiddleware, cardController.createCard);
router.delete('/cards/:_id', authMiddleware, cardController.deleteCard);
router.put('/cards/:_id/likes', authMiddleware, cardController.likeCard);
router.delete('/cards/:_id/likes', authMiddleware, cardController.dislikeCard);

module.exports = router;
