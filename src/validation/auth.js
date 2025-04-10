import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .max(20)
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.max': 'PhoneNumber should have at most 20 characters',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
