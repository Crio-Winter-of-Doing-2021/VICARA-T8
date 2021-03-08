import Joi from "joi";

//TODO: Add Name field and Regex for password
const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});

module.exports = {
  authSchema,
};
