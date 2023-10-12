/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');

const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

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

const validateURL = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('custom.link');
  }
  return value;
};

const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().custom(validateURL),
  }),
});

const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

router.get('/cards', authMiddleware, cardController.getCards);
router.get('/cards/:_id', authMiddleware, cardIdValidation, cardController.getCardById);
router.post('/cards', authMiddleware, createCardValidation, cardController.createCard);
router.delete('/cards/:_id', authMiddleware, cardIdValidation, cardController.deleteCard);
router.put('/cards/:_id/likes', authMiddleware, cardIdValidation, cardController.likeCard);
router.delete('/cards/:_id/likes', authMiddleware, cardIdValidation, cardController.dislikeCard);

module.exports = router;
