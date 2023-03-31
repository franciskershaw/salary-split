const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

//Controllers

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

// Removed after refactor
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { addTransactionSchema } = require('../validation/joiSchemas');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors/errors');

router.post(
  '/',
  isLoggedIn,
  asyncHandler(async (req, res, next) => {
    try {
      const { error, value } = addTransactionSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.details[0].message);
      }

      const { name, amount, sendToAccount, type } = value;

      const userId = req.user._id;
      const nameInUse = await Transaction.findOne({
        user: userId,
        name: value.name,
      });
      if (nameInUse) {
        throw new ConflictError("You've used that name already");
      }

      const transaction = new Transaction({
        user: userId,
        name,
        amount,
        sendToAccount,
        type,
      });
      await transaction.save();

      const user = await User.findById(userId);
      user.transactions.push(transaction._id);
      await user.save();

      res.status(201).json({ transaction });
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;
