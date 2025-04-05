import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const products = await getAllProducts({ page, perPage });
  res.json({
    status: 200,
    message: 'Successfully found all products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  if (!productId) {
    next(new Error('Product not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const product = await createProduct({ ...req.body, photo: photoUrl });
  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const photo = req.file;
  let photoUrl;
  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const { productId } = req.params;
  const result = await updateProduct(productId, {
    ...req.body,
    photo: photoUrl,
  });
  if (!result) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a product!`,
    data: result.product,
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);
  if (!product) {
    next(createHttpError(404, 'Product not found'));
    return;
  }
  res.status(204).send();
};
