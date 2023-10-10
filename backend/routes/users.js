/* eslint-disable import/no-dynamic-require */
const express = require('express');
const path = require('path');
const authMiddleware = require(path.join(
  __dirname,
  '..',
  'middlewares',
  'auth'
));

const userController = require(path.join(
  __dirname,
  '..',
  'controllers',
  'users'
));

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:_id', userController.getUserById);
router.get('/users/me', authMiddleware, userController.getCurrentUser);
router.patch('/users/me', userController.updateUserProfile);
router.patch('/users/me/avatar', userController.updateUserAvatar);

module.exports = router;
