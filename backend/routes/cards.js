/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');

const cardController = require(path.join(
  __dirname,
  '..',
  'controllers',
  'cards',
));

const router = express.Router();

router.get('/cards', cardController.getCards);
router.get('/cards/:_id', cardController.getCardById);
router.post('/cards', cardController.createCard);
router.delete('/cards/:_id', cardController.deleteCard);
router.put('/cards/:_id/likes', cardController.likeCard);
router.delete('/cards/:_id/likes', cardController.dislikeCard);

module.exports = router;
