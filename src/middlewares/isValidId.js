import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { productId } = req.params;
  if (!isValidObjectId(productId)) {
    throw createHttpError(
      400,
      `Invalid ID format: '${productId}' is not a valid ObjectId`,
    );
  }
  next();
};
