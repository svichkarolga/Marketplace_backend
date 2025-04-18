import createHttpError from 'http-errors';
import { ProductsCollection } from '../db/models/products.js';

export const checkProductOwnership = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const product = await ProductsCollection.findById(productId);
    if (!product) {
      return next(createHttpError(404, 'Product not found'));
    }
    if (!product.sellerId.equals(userId)) {
      return next(createHttpError(403, 'Access denied: not your product'));
    }
    req.product = product;
    next();
  } catch (err) {
    next(err);
  }
};
