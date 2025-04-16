import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 100 characters',
    'any.required': 'Name is required',
  }),
  category: Joi.string()
    .valid(
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
    )
    .required()
    .messages({
      'any.only':
        'Field should have one of this values: children, pet, home, fashion, hobby, sport, tools, gadget, garden, free',
      'any.required': 'Category is required',
    }),
  description: Joi.string().max(1500).required().messages({
    'string.base': 'Description should be a string',
    'string.max': 'Description should have at most 1500 characters',
    'any.required': 'Description is required',
  }),
  condition: Joi.string().valid('new', 'used').required().messages({
    'any.only': 'Field should have one of this values: new or used',
    'any.required': 'Condition of product is required',
  }),
  price: Joi.number().min(0).max(999999).required().messages({
    'number.base': 'Price should be a number',
    'number.min': 'Price should be at least 0',
    'number.max': 'Price should not exceed 999999',
    'any.required': 'Price is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .max(15)
    .required()
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.max': 'PhoneNumber should have 12 characters',
      'any.required': 'PhoneNumber is required',
    }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Photo must be a valid URL',
  }),
  region: Joi.string()
    .valid(
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
    )
    .required()
    .messages({
      'any.only': 'Please select one of 25 regions of Ukraine',
      'any.required': 'Region is required',
    }),
  city: Joi.string().min(3).max(20).required().messages({
    'string.base': 'City should be a string',
    'string.min': 'City should have at least 3 characters',
    'string.max': 'City should have at most 20 characters',
    'any.required': 'City is required',
  }),
  delivery: Joi.string().valid('self - pickup', 'mail').messages({
    'any.only': 'Field should have one of this values: self - pickup, mail',
  }),
  sellerId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Seller id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 100 characters',
  }),
  category: Joi.string().messages({
    'any.only':
      'Field should have one of this values: children, pet, home, fashion, hobby, sport, tools, gadget, garden, free',
  }),
  description: Joi.string().max(1500).messages({
    'string.base': 'Description should be a string',
    'string.max': 'Description should have at most 1500 characters',
  }),
  condition: Joi.string().messages({
    'any.only': 'Field should have one of this values: new or used',
  }),
  price: Joi.number().min(0).max(999999).messages({
    'number.base': 'Price should be a number',
    'number.min': 'Price should be at least 0',
    'number.max': 'Price should not exceed 999999',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[+]?[0-9]{10,15}$/)
    .max(15)
    .messages({
      'string.base': 'PhoneNumber should start with "+"',
      'string.max': 'PhoneNumber should have 12 characters',
    }),
  photo: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Photo must be a valid URL',
  }),
  region: Joi.string()
    .valid(
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
    )
    .messages({
      'any.only': 'Please select one of 25 regions of Ukraine',
    }),
  city: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
  }),
  delivery: Joi.string().valid('self - pickup', 'mail').messages({
    'any.only': 'Field should have one of this values: self - pickup, mail',
  }),
  sellerId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Seller id should be a valid mongo id');
    }
    return true;
  }),
});
