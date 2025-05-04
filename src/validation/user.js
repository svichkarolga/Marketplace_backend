import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(1).max(150),
  email: Joi.string().email(),
  password: Joi.string(),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .max(15)
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.max': 'PhoneNumber should have at most 15 characters',
    }),
  photo: Joi.string().uri(),
  linkField1: Joi.string().uri().allow('', null),
  linkField2: Joi.string().uri().allow('', null),
  linkField3: Joi.string().uri().allow('', null),
  linkField4: Joi.string().uri().allow('', null),
  linkField5: Joi.string().uri().allow('', null),
});
