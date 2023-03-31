const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {
  addAccountSchema,
  updateAccountSchema,
} = require('../validation/joiSchemas');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors/errors');

// import controllers here

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');
const Account = require('../models/Account');
const User = require('../models/User');

router.post(
  '/',
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    try {
      const { error, value } = addAccountSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.details[0].message);
      }

      const userId = req.user._id;
      const nameInUse = await Account.findOne({
        user: userId,
        name: value.name,
      });
      if (nameInUse) {
        throw new ConflictError("You've used that name already");
      }

      const { name, amount, defaultAccount, acceptsFunds, excludeFromTotal } =
        value;

      // Ensure there is only one defaultAccount
      if (defaultAccount) {
        const previousDefaults = await Account.find({
          user: userId,
          defaultAccount: true,
        });
        if (previousDefaults.length) {
          for (let account of previousDefaults) {
            account.defaultAccount = false;
            await account.save();
          }
        }
      }

      const account = new Account({
        name,
        user: userId,
        amount,
        defaultAccount,
        acceptsFunds,
        excludeFromTotal,
      });

      await account.save();

      const user = await User.findById(userId);
      user.accounts.push(account._id);
      await user.save();

      res.status(201).json({ account });
    } catch (err) {
      next(err);
    }
  })
);

router.put('/:accountId', isLoggedIn, isAuthorised, asyncHandler(async (req, res, next) => {
    try {
      const { error, value } = updateAccountSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.details[0].message);
      }

      const account = await Account.findById(req.params.accountId);

      if (!account) {
        throw new NotFoundError('Account not found');
      }

      const updatedAccount = await Account.findByIdAndUpdate(
        req.params.accountId,
        value,
        { new: true }
      );

      res.status(200).json(updatedAccount);
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;
