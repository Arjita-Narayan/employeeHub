const Joi = require("@hapi/joi");

const authSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(10).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).max(10).required(),
});
const authSchemaLogin = Joi.object({
  username: Joi.string().alphanum().min(5).max(10).required(),
  password: Joi.string().min(8).max(10).required(),
});

module.exports = {
  authSchema: authSchema,
  authSchemaLogin: authSchemaLogin,
};
