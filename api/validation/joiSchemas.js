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
  acceptsFunds: Joi.boolean()
    .required()
    .when('defaultAccount', {
      is: true,
      then: Joi.boolean().valid(true),
    }),
  excludeFromTotal: Joi.boolean()
    .required()
    .when('defaultAccount', {
      is: true,
      then: Joi.boolean().valid(false),
    }),
});

const updateAccountSchema = Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().optional(),
  defaultAccount: Joi.boolean().optional(),
  acceptsFunds: Joi.boolean()
    .optional()
    .when('defaultAccount', {
      is: true,
      then: Joi.boolean().valid(true),
    }),
  excludeFromTotal: Joi.boolean()
    .optional()
    .when('defaultAccount', {
      is: true,
      then: Joi.boolean().valid(false),
    }),
})
  .min(1)
  .or('name', 'amount', 'defaultAccount', 'acceptsFunds', 'excludeFromTotal');

const addTransactionSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  sendToAccount: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  type: Joi.string().valid('bill', 'savings').required(),
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  addAccountSchema,
  updateAccountSchema,
  addTransactionSchema,
};
