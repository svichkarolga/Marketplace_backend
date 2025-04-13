import { Router } from 'express';
import productsRouter from './products.js';
import authRouter from './auth.js';
import favoritesRouter from './favorites.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/auth', authRouter);
router.use('/favorites', favoritesRouter);

export default router;
