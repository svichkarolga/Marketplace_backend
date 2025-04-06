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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/auth.js';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  checkRoles(ROLES.BUYER, ROLES.SELLER),
  ctrlWrapper(getProductsController),
);

router.get(
  '/:productId',
  isValidId,
  checkRoles(ROLES.BUYER, ROLES.SELLER),
  ctrlWrapper(getProductByIdController),
);

router.post(
  '/',
  upload.single('photo'),
  validateBody(createProductSchema),
  checkRoles(ROLES.SELLER),
  ctrlWrapper(createProductController),
);

router.patch(
  '/:productId',
  isValidId,
  upload.single('photo'),
  validateBody(updateProductSchema),
  checkRoles(ROLES.SELLER),
  ctrlWrapper(patchProductController),
);

router.delete(
  '/:productId',
  isValidId,
  checkRoles(ROLES.SELLER),
  ctrlWrapper(deleteProductController),
);

export default router;
