import { FavoritesCollection } from '../db/models/favorites.js';
import { ProductsCollection } from '../db/models/products.js';

export const addFavorite = async (userId, productId) => {
  const favorite = await FavoritesCollection.create({ userId, productId });
  await ProductsCollection.findByIdAndUpdate(productId, {
    $inc: { favoritesCount: 1 },
  });
  return favorite;
};

export const removeFavorite = async (userId, productId) => {
  const favorite = await FavoritesCollection.findOneAndDelete({
    userId,
    productId,
  });
  if (favorite) {
    await ProductsCollection.findByIdAndUpdate(productId, {
      $inc: { favoritesCount: -1 },
    });
  }
  return favorite;
};

export const getFavoritesByUser = async (userId) => {
  const favorites = await FavoritesCollection.find({ userId }).populate(
    'productId',
  );
  return favorites.map((fav) => fav.productId);
};
