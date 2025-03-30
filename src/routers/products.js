import { Router } from 'express';
// import {
//   getProductsController,
//   getProductsByIdController,
//   createProductController,
//   patchProductController,
//   deleteProductController,
// } from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';
// import { upload } from '../middlewares/multer.js';

const router = Router();

// router.use(authenticate);

// router.get('/', ctrlWrapper(getProductsController));

// router.get('/:contactId', isValidId, ctrlWrapper(getProductsByIdController));

// router.post(
//   '/',
//   upload.single('photo'),
//   validateBody(createProductSchema),
//   ctrlWrapper(createProductController),
// );

// router.patch(
//   '/:productId',
//   isValidId,
//   upload.single('photo'),
//   validateBody(updateProductSchema),
//   ctrlWrapper(patchProductController),
// );

// router.delete('/:productId', isValidId, ctrlWrapper(deleteProductController));

export default router;
