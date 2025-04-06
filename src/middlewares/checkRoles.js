import createHttpError from 'http-errors';
import { ProductsCollection } from '../db/models/products.js';
import { ROLES } from '../constants/auth.js';

// export const checkRoles =
//   (...roles) =>
//   async (req, res, next) => {
//     const { user } = req;
//     if (!user) {
//       next(createHttpError(401));
//       return;
//     }
//     const { role } = user;
//     if (roles.includes(ROLES.BUYER) && role === ROLES.BUYER) {
//       next();
//       return;
//     }
//     if (roles.includes(ROLES.SELLER) && role === ROLES.SELLER) {
//       const { productId } = req.params;
//       if (!productId) {
//         next(createHttpError(403));
//         return;
//       }
//       const product = await ProductsCollection.findOne({
//         _id: productId,
//         sellerId: user._id,
//       });
//       if (product) {
//         next();
//         return;
//       }
//     }
//     next(createHttpError(403));
//   };

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(createHttpError(401));
    }

    const { role } = user;

    // Если роль разрешена — дальше проверим только для PATCH/DELETE
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

      return next(); // всё ок
    }

    return next(createHttpError(403, 'Access denied'));
  };
