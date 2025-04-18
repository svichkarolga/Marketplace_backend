import { Router } from 'express';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  patchProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { checkProductOwnership } from '../middlewares/checkProductOwnership.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:productId',
  isValidId,
  checkProductOwnership,
  upload.single('photo'),
  validateBody(updateProductSchema),
  ctrlWrapper(patchProductController),
);

router.delete(
  '/:productId',
  isValidId,
  checkProductOwnership,
  ctrlWrapper(deleteProductController),
);

export default router;
