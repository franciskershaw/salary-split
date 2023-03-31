const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

//Controllers

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

// Removed after refactor
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const {
  addTransactionSchema,
  updateTransactionSchema,
} = require('../validation/joiSchemas');
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

router.put(
  '/:transactionId',
  isLoggedIn,
  isAuthorised,
  asyncHandler(async (req, res, next) => {
    try {
      console.log(req.body);
      const transaction = await Transaction.findById(req.params.transactionId);

      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }

      const { error, value } = updateTransactionSchema.validate(req.body);
      if (error) {
        throw new BadRequestError(error.details[0].message);
      }

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.transactionId,
        value,
        { new: true }
      );

      res.status(200).json(updatedTransaction);
    } catch (err) {
      next(err);
    }
  })
);

router.delete(
  '/:transactionId',
  isLoggedIn,
  isAuthorised,
  asyncHandler(async (req, res, next) => {
    try {
      const { transactionId } = req.params;
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) {
        throw NotFoundError('Transaction not found');
      }
      await Transaction.findByIdAndDelete(transactionId);
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { transactions: transactionId },
        },
        { new: true }
      );
      res.status(200).json({ msg: 'Transaction deleted' });
    } catch (err) {
      next(err);
    }
  })
);

module.exports = router;
