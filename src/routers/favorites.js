import express from 'express';
import {
  addFavoriteController,
  removeFavoriteController,
  getFavoritesController,
} from '../controllers/favorites.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.post('/:productId', addFavoriteController);
router.delete('/:productId', removeFavoriteController);
router.get('/', getFavoritesController);

export default router;
