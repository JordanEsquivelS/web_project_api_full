/* eslint-disable import/no-dynamic-require */
const mongoose = require('mongoose');
const path = require('path');

const Card = require(path.join(__dirname, '..', 'models', 'card'));

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({})
      .populate({
        path: 'owner',
        select: 'name about _id',
      })
      .populate({
        path: 'likes',
        select: 'name about _id',
      });
    return res.status(200).send(cards);
  } catch (error) {
    error.status = 500;
    error.message = 'Error al obtener las tarjetas';
    return next(error);
  }
};

exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;

  try {
    const card = new Card({
      name,
      link,
      owner: req.user._id,
    });
    await card.save();
    const populatedCard = await card.populate({
      path: 'owner',
      select: 'name about _id',
    });

    return res.status(201).send(populatedCard);
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errorMessage = error.message;
      if (error.errors && error.errors.name && error.errors.name.kind === 'minlength') {
        errorMessage = 'El nombre debe tener entre 2 y 30 caracteres';
      }

      return res.status(400).send({ message: errorMessage });
    }

    error.status = 400;
    error.message = 'Error al crear la tarjeta';
    return next(error);
  }
};

exports.getCardById = async (req, res, next) => {
  const cardId = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    const error = new Error('Id de tarjeta no válido');
    error.status = 404;
    return next(error);
  }

  try {
    const card = await Card.findById(cardId).orFail(() => {
      const error = new Error('Id de tarjeta no encontrado');
      error.status = 404;
      throw error;
    });

    return res.status(200).send(card);
  } catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error al obtener la tarjeta';
    }
    return next(error);
  }
};

exports.deleteCard = async (req, res, next) => {
  const cardId = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    const error = new Error('Id de tarjeta no válido');
    error.status = 404;
    return next(error);
  }

  try {
    const card = await Card.findById(cardId).orFail(() => {
      const error = new Error('Id de tarjeta no encontrado');
      error.status = 404;
      throw error;
    });

    if (card.owner.toString() !== req.user._id.toString()) {
      const error = new Error('Error de autorización: Tarjeta no pertenece al usuario');
      error.status = 403;
      throw error;
    }
    await Card.deleteOne({ _id: cardId });
    return res.status(200).send({ message: 'Tarjeta eliminada correctamente' });
  } catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error al eliminar la tarjeta';
    }
    return next(error);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .populate({
        path: 'likes',
        select: 'name about _id',
      })
      .orFail(new Error('Tarjeta no encontrada'));

    return res.status(200).send(updatedCard);
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError || error.message === 'Tarjeta no encontrada'
    ) {
      error.status = 404;
      error.message = 'Tarjeta no encontrada';
    } else {
      error.status = 500;
      error.message = 'Error al dar like a la tarjeta';
    }
    return next(error);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params._id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('Tarjeta no encontrada'));

    return res.status(200).send(updatedCard);
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError || error.message === 'Tarjeta no encontrada'
    ) {
      error.status = 404;
      error.message = 'Tarjeta no encontrada';
    } else {
      error.status = 500;
      error.message = 'Error al dar dislike a la tarjeta';
    }
    return next(error);
  }
};
