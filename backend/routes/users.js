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
  if (!validator.isURL(value)) {
    return helpers.error('custom.link');
  }
  return value;
};

const validateUserId = (value, helpers) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  if (!regex.test(value)) {
    return helpers.error('custom.id');
  }
  return value;
};

const userIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string()
      .required()
      .custom(validateUserId),
  }),
});

const validateLength = (value, helpers) => {
  if (value.length < 2 || value.length > 30) {
    return helpers.error('custom.length');
  }
  return value;
};

const userValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().custom(validateLength),
    about: Joi.string().optional().custom(validateLength)
  }),
});


router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/me', authMiddleware, userController.getCurrentUser);

router.get(
  '/users/:_id',
  authMiddleware,
  userIdValidation,
  userController.getUserById,
);

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
