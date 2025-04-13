import mongoose from 'mongoose';

const FavoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

FavoritesSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const FavoritesCollection = mongoose.model('Favorite', FavoritesSchema);
