const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().max(30).required().regex(/^\S+$/),
  name: Joi.string().max(30).required(),
  monthlySalary: Joi.number().positive().required(),
  password: Joi.string().max(20).required().min(6),
});

const loginUserSchema = Joi.object({
  username: Joi.string().max(30).required().regex(/^\S+$/),
  password: Joi.string().max(20).required().min(6),
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

const updateTransactionSchema = Joi.object({
  name: Joi.string().optional(),
  amount: Joi.number().optional(),
  sendToAccount: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  type: Joi.string().valid('bill', 'savings').optional(),
})
  .min(1)
  .or('name', 'amount', 'sendToAccount', 'type');

module.exports = {
  createUserSchema,
  loginUserSchema,
  addAccountSchema,
  updateAccountSchema,
  addTransactionSchema,
  updateTransactionSchema,
};
