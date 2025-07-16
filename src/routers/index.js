import { Router } from 'express';
import productsRouter from './products.js';
import authRouter from './auth.js';
import favoritesRouter from './favorites.js';
import userRouter from './user.js';
import reviewRouter from './review.js';
import messageRouter from './messages.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/auth', authRouter);
router.use('/favorites', favoritesRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewRouter);
router.use('/messages', messageRouter);

export default router;
