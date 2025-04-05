const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) return;
  const isCategory = (category) =>
    [
      'children',
      'pet',
      'home',
      'fashion',
      'hobby',
      'sport',
      'tools',
      'gadget',
      'garden',
      'free',
    ].includes(category);
  if (isCategory(category)) return category;
};

const parseNumber = (number) => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parsedNumber;
};

const parseName = (name) => {
  if (typeof name !== 'string') return;
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const parseFilterParams = (query) => {
  const { category, maxPrice, minPrice, name } = query;

  const parsedCategory = parseCategory(category);
  const parsedMaxPrice = parseNumber(maxPrice);
  const parsedMinPrice = parseNumber(minPrice);
  const parsedName = parseName(name);

  return {
    category: parsedCategory,
    maxPrice: parsedMaxPrice,
    minPrice: parsedMinPrice,
    name: parsedName,
  };
};
