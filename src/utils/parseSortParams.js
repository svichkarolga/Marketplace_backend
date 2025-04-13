import { SORT_ORDER } from '../constants/products.js';

const parseSortOrder = (sortOrder = '') => {
  const normalized = sortOrder.toLowerCase?.();
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(normalized);
  return isKnownOrder ? normalized : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfProduct = [
    '_id',
    'name',
    'category',
    'description',
    'price',
    'condition',
    'region',
    'city',
    'delivery',
    'sellerId',
    'phoneNumber',
    'timestamps',
    'favoritesCount',
  ];
  if (keysOfProduct.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
