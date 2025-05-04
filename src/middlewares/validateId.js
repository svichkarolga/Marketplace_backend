import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(
      400,
      `Invalid ID format: '${id}' is not a valid ObjectId`,
    );
  }
  next();
};
