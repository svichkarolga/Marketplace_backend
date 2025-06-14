import { Router } from 'express';
import {
  createReviewController,
  getSellerReviewsController,
  getRatingStatsController,
} from '../controllers/review.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  validateRatingRequest,
  validateSellerId,
} from '../middlewares/validateRating.js';
import { createReviewSchema } from '../validation/review.js';

const router = Router();

router.post(
  '/:sellerId',
  authenticate,
  validateRatingRequest,
  validateBody(createReviewSchema),
  ctrlWrapper(createReviewController),
);

router.get(
  '/:sellerId',
  validateSellerId,
  ctrlWrapper(getSellerReviewsController),
);

router.get(
  '/:sellerId/stats',
  validateSellerId,
  ctrlWrapper(getRatingStatsController),
);

export default router;
