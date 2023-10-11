/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const validator = require('validator');

const { celebrate, Joi, Segments } = require('celebrate');

const authMiddleware = require(path.join(
  __dirname,
  '..',
  'middlewares',
  'auth',
));

const userController = require(path.join(
  __dirname,
  '..',
  'controllers',
  'users',
));

const router = express.Router();

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const userIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  }),
});

const userValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    about: Joi.string().min(2).max(30).optional(),
    avatar: Joi.string().required().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

router.get('/users', authMiddleware, userController.getUsers);

router.get(
  '/users/:_id',
  authMiddleware,
  userIdValidation,
  userController.getUserById,
);

router.get('/users/me', authMiddleware, userController.getCurrentUser);

router.patch(
  '/users/me',
  authMiddleware,
  userValidation,
  userController.updateUserProfile,
);

router.patch(
  '/users/me/avatar',
  authMiddleware,
  celebrate({
    [Segments.BODY]: Joi.object({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  userController.updateUserAvatar,
);

module.exports = router;
