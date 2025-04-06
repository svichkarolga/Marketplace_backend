import createHttpError from 'http-errors';
import { ProductsCollection } from '../db/models/products.js';
import { ROLES } from '../constants/auth.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(createHttpError(401));
    }
    const { role } = user;

    if (roles.includes(role)) {
      if (
        role === ROLES.SELLER &&
        ['PATCH', 'DELETE'].includes(req.method) &&
        req.params.productId
      ) {
        const product = await ProductsCollection.findOne({
          _id: req.params.productId,
          sellerId: user._id,
        });
        if (!product) {
          return next(createHttpError(403, 'Not your product'));
        }
      }
      return next();
    }

    return next(createHttpError(403, 'Access denied'));
  };
