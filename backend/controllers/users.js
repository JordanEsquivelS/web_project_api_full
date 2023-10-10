/* eslint-disable import/no-dynamic-require */
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const User = require(path.join(__dirname, '..', 'models', 'user'));

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    err.message = 'No se pudo obtener la lista de usuarios';
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error('ID de usuario no válido');
    error.status = 404;
    return next(error);
  }

  try {
    const user = await User.findById(userId).orFail(() => {
      const error = new Error('ID de Usuario no encontrado');
      error.status = 404;
      throw error;
    });

    return res.status(200).send(user);
  } catch (err) {
    err.message = err.message || 'Error al obtener el usuario';
    return next(err);
  }
};

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  about: Joi.string().min(2).max(30).optional(),
  avatar: Joi.string().uri().optional(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const createUser = async (req, res, next) => {
  const validationResult = userValidationSchema.validate(req.body);

  if (validationResult.error) {
    const error = new Error(validationResult.error.details[0].message);
    error.status = 400;
    return next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    err.status = 400;
    if (err.name === 'ValidationError' && err.errors.avatar) {
      err.message = 'No se creó el usuario debido a una URL no válida';
    } else {
      err.message = 'Error al crear el usuario';
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error('Correo electrónico o contraseña incorrecta.');
      error.status = 401;
      return next(error);
    }

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
    return res.status(200).send({ token });
  } catch (err) {
    err.message = 'Error interno del servidor.';
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return res.status(200).send(user);
  } catch (err) {
    err.message = err.message || 'Error al obtener el usuario';
    return next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'about'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    const error = new Error('Actualizaciones no válidas!');
    error.status = 400;
    return next(error);
  }

  try {
    const user = await User.findById(req.user._id).orFail(new Error('Usuario no encontrado'));

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();
    return res.send(user);
  } catch (err) {
    if (err.message === 'Usuario no encontrado') {
      err.status = 404;
    } else {
      err.status = 400;
      err.message = 'Error al actualizar el usuario';
    }
    return next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    if (!req.body.avatar) {
      return res
        .status(400)
        .send({ message: 'El campo avatar es requerido para esta operación.' });
    }

    const user = await User.findById(req.user._id).orFail(new Error('Usuario no encontrado'));

    user.avatar = req.body.avatar;
    await user.save();

    return res.send(user);
  } catch (err) {
    if (err.message === 'Usuario no encontrado') {
      err.status = 404;
    } else if (err.name === 'ValidationError') {
      err.status = 400;
    } else {
      err.status = 400;
      err.message = 'Error al actualizar el avatar';
    }
    return next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
  getCurrentUser,
};
