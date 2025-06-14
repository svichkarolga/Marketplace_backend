import { ReviewsCollection } from '../db/models/review.js';
import { UsersCollection } from '../db/models/user.js';

export const createReview = async (sellerId, buyerId, rating, comment) => {
  const review = await ReviewsCollection.create({
    seller: sellerId,
    buyer: buyerId,
    rating,
    comment,
  });
  await updateSellerRating(sellerId);
  return review;
};

export const updateSellerRating = async (sellerId) => {
  const result = await ReviewsCollection.aggregate([
    { $match: { seller: sellerId } },
    {
      $group: {
        _id: '$seller',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ]);
  const updateData = {
    sellerRating: 0,
    ratingCount: 0,
  };

  if (result.length > 0) {
    updateData.sellerRating = parseFloat(result[0].averageRating.toFixed(1));
    updateData.ratingCount = result[0].count;
  }

  await UsersCollection.findByIdAndUpdate(sellerId, updateData);
  return updateData;
};

export const getSellerReviews = async (sellerId) => {
  return ReviewsCollection.find({ seller: sellerId })
    .populate('buyer', 'name photo')
    .sort({ createdAt: -1 });
};

export const getSellerReviewsWithStats = async (sellerId) => {
  const reviews = await ReviewsCollection.find({ seller: sellerId })
    .populate('buyer', 'name photo')
    .sort({ createdAt: -1 });

  // Рассчитываем статистику
  const stats = {
    averageRating: 0,
    totalReviews: reviews.length,
    ratingDistribution: [0, 0, 0, 0, 0], // [1★, 2★, 3★, 4★, 5★]
  };

  if (reviews.length > 0) {
    const sum = reviews.reduce((acc, review) => {
      stats.ratingDistribution[review.rating - 1]++;
      return acc + review.rating;
    }, 0);

    stats.averageRating = parseFloat((sum / reviews.length).toFixed(1));
  }

  return { reviews, stats };
};
