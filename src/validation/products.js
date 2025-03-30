import Joi from 'joi';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  category: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Category should be a string',
    'string.min': 'Category should have at least 3 characters',
    'string.max': 'Category should have at most 20 characters',
    'any.required': 'Category is required',
  }),
  description: Joi.string().min(10).max(150).required().messages({
    'string.base': 'Description should be a string',
    'string.min': 'Description should have at least 10 characters',
    'string.max': 'Description should have at most 150 characters',
    'any.required': 'Description is required',
  }),
  price: Joi.string().min(1).max(10).required().messages({
    'string.base': 'Price should be a string',
    'string.min': 'Price should have at least 1 character',
    'string.max': 'Price should have at most 10 characters',
    'any.required': 'Price is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.min': 'PhoneNumber should have at least 3 characters',
      'string.max': 'PhoneNumber should have at most 20 characters',
      'any.required': 'PhoneNumber is required',
    }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Photo must be a valid URL',
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().allow('').messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
  }),
  phoneNumber: Joi.string()
    .optional()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .min(3)
    .max(20)
    .allow('')
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.min': 'Name should have at least 3 characters',
      'string.max': 'Name should have at most 20 characters',
    }),
  email: Joi.string()
    .optional()
    .allow('')
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .pattern(emailRegexp)
    .messages({
      'string.base': 'Input correct email, for example: example@domain.com',
    }),
  isFavourite: Joi.boolean().optional().allow('').messages({
    'boolean.base': 'Field must be true or false',
  }),
  contactType: Joi.string()
    .valid('personal', 'home', 'work')
    .optional()
    .allow('')
    .messages({
      'any.only': 'Field should have one of this values: personal, home, work.',
    }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Photo must be a valid URL',
  }),
});
