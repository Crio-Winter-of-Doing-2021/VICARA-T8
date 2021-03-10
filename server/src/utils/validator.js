const Joi = require('@hapi/joi');

//TODO: Add Name field and Regex for password, Custom Error Messages
const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is a required field.',
  }),
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': `Email is a required field.`,
  }),
  password: Joi.string().min(2).required().messages({
    'string.empty': 'Password is a required field.',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    'string.empty': `Email is a required field.`,
  }),
  password: Joi.string().min(2).required().messages({
    'string.empty': 'Password is a required field.',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
