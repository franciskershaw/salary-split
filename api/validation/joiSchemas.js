const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const loginUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

module.exports = { createUserSchema, loginUserSchema };
