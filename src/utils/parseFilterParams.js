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

const parseCondition = (condition) => {
  const allowed = ['new', 'used'];
  if (typeof condition !== 'string') return;
  return allowed.includes(condition.toLowerCase())
    ? condition.toLowerCase()
    : undefined;
};

const REGIONS = [
  'Vinnytska',
  'Volynska',
  'Dnipropetrovska',
  'Donetska',
  'Zhytomyrska',
  'Zakarpatska',
  'Zaporizka',
  'Ivano-Frankivska',
  'Kyivska',
  'Kirovohradska',
  'Luhanska',
  'Lvivska',
  'Mykolaivska',
  'Odeska',
  'Poltavska',
  'Rivnenska',
  'Sumska',
  'Ternopilska',
  'Kharkivska',
  'Khersonska',
  'Khmelnytska',
  'Cherkaska',
  'Chernivetska',
  'Chernihivska',
  'Crimea',
];

const parseRegion = (region) => {
  if (typeof region !== 'string') return;
  const trimmed = region.trim();
  const foundRegion = REGIONS.find(
    (r) => r.toLowerCase() === trimmed.toLowerCase(),
  );
  return foundRegion || undefined;
};

const parseCity = (city) => {
  if (typeof city !== 'string') return;
  const trimmed = city.trim();
  return trimmed.length > 0
    ? { $regex: `^${trimmed}$`, $options: 'i' }
    : undefined;
};

const parseSellerId = (sellerId) => {
  if (typeof sellerId !== 'string') return;
  const isValid = /^[a-f\d]{24}$/i.test(sellerId);
  return isValid ? sellerId : undefined;
};

export const parseFilterParams = (query) => {
  const {
    category,
    maxPrice,
    minPrice,
    name,
    condition,
    region,
    city,
    sellerId,
  } = query;

  const parsedCategory = parseCategory(category);
  const parsedMaxPrice = parseNumber(maxPrice);
  const parsedMinPrice = parseNumber(minPrice);
  const parsedName = parseName(name);
  const parsedCondition = parseCondition(condition);
  const parsedRegion = parseRegion(region);
  const parsedCity = parseCity(city);
  const parsedSellerId = parseSellerId(sellerId);

  return {
    category: parsedCategory,
    maxPrice: parsedMaxPrice,
    minPrice: parsedMinPrice,
    name: parsedName,
    condition: parsedCondition,
    region: parsedRegion,
    city: parsedCity,
    sellerId: parsedSellerId,
  };
};
