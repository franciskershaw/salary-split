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

const addAccountSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  defaultAccount: Joi.boolean().required(),
  acceptsFunds: Joi.boolean().required().when('defaultAccount', {
    is: true,
    then: Joi.boolean().valid(true),
  }),
  excludeFromTotal: Joi.boolean().required().when('defaultAccount', {
    is: true,
    then: Joi.boolean().valid(false),
  }),
});

module.exports = { createUserSchema, loginUserSchema, addAccountSchema };
