import createHttpError from 'http-errors';
import {
  addFavorite,
  removeFavorite,
  getFavoritesByUser,
} from '../services/favorites.js';

export const addFavoriteController = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;
  try {
    const result = await addFavorite(userId, productId);
    res.status(201).json({ status: 201, message: 'Added to favorites' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: 'Already in favorites' });
    } else {
      next(error);
    }
  }
};

export const removeFavoriteController = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const result = await removeFavorite(userId, productId);
  if (!result) {
    next(createHttpError(404, 'Not in favorites'));
    return;
  }
  res.status(204).send();
};

export const getFavoritesController = async (req, res) => {
  const userId = req.user._id;
  const favorites = await getFavoritesByUser(userId);
  res.json({ message: 'Favorites fetched', data: favorites });
};
