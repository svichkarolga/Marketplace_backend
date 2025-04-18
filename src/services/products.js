import { ProductsCollection } from '../db/models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/products.js';

export const getAllProducts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const productsQuery = ProductsCollection.find({ userId });
  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }
  if (filter.region) {
    productsQuery.where('region').equals(filter.region);
  }
  if (filter.condition) {
    productsQuery.where('condition').equals(filter.condition);
  }
  if (filter.city) {
    productsQuery.where('city').equals(filter.city);
  }
  if (filter.maxPrice !== undefined) {
    productsQuery.where('price').lte(filter.maxPrice);
  }
  if (filter.minPrice !== undefined) {
    productsQuery.where('price').gte(filter.minPrice);
  }
  if (filter.price !== undefined) {
    productsQuery.where('price').equals(filter.price);
  }
  if (filter.name) {
    productsQuery.where('name', new RegExp(filter.name, 'i'));
  }
  const productsCount = await ProductsCollection.find()
    .merge(productsQuery)
    .countDocuments();
  const products = await productsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(productsCount, perPage, page);
  return { data: products, ...paginationData };
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findOne({
    _id: productId,
  });
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    {
      _id: productId,
    },
    payload,

    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({
    _id: productId,
  });
  return product;
};
