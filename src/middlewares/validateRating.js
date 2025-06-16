import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateRatingRequest = (req, res, next) => {
  try {
    const { sellerId } = req.params;
    const { rating } = req.body;
    const buyerId = req.user._id;
    if (!rating) {
      return next(createHttpError(400, 'Rating is required'));
    }
    if (rating === undefined) {
      throw createHttpError(400, 'Rating is required');
    }
    if (!isValidObjectId(sellerId)) {
      throw createHttpError(400, 'Invalid seller ID format');
    }
    if (buyerId.equals(sellerId)) {
      throw createHttpError(400, "You can't rate yourself");
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      throw createHttpError(400, 'Rating must be a number between 1 and 5');
    }
    req.ratingData = { sellerId, buyerId, rating };
    next();
  } catch (error) {
    next(error);
  }
};

export const validateSellerId = (req, res, next) => {
  const { sellerId } = req.params;
  if (!isValidObjectId(sellerId)) {
    return next(createHttpError(400, 'Invalid seller ID'));
  }
  req.sellerId = sellerId;
  next();
};
