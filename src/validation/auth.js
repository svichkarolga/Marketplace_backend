import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(1).max(150).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .max(15)
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.max': 'PhoneNumber should have at most 15 characters',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
