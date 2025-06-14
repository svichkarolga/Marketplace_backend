import {
  createReview,
  getSellerReviews,
  getSellerReviewsWithStats,
} from '../services/review.js';

export const createReviewController = async (req, res, next) => {
  try {
    const { sellerId, buyerId, rating } = req.ratingData;
    const { comment = '' } = req.body;
    const review = await createReview(sellerId, buyerId, rating, comment);
    res.status(201).json({
      status: 201,
      message: 'Review created successfully',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getSellerReviewsController = async (req, res, next) => {
  try {
    const reviews = await getSellerReviews(req.sellerId);
    res.json({
      status: 200,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getRatingStatsController = async (req, res, next) => {
  try {
    const { reviews, stats } = await getSellerReviewsWithStats(req.sellerId);
    res.json({
      status: 200,
      data: {
        meta: stats,
        reviews,
      },
    });
  } catch (error) {
    next(error);
  }
};
