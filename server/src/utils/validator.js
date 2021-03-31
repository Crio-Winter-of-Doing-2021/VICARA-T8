const Joi = require('@hapi/joi');

//TODO: Add Name field and Regex for password, Custom Error Messages
const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is a required field.',
  }),
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': `Email is a required field.`,
    'string.email': 'Email is not valid.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is a required field.',
    'string.min': 'Password must be atleast 6 characters.',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': `Email is a required field.`,
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is a required field.',
  }),
});

const fileFavouiteSchema = Joi.object({
  isFavourite: Joi.boolean().required().messages({
    'boolean.base': 'Favourite must be boolean.',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  fileFavouiteSchema,
};
