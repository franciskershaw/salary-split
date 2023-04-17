const Account = require('../models/Account');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const {
  addAccountSchema,
  updateAccountSchema,
} = require('../validation/joiSchemas');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors/errors');

const getAccounts = async (req, res, next) => {
  try {
    const { accounts: accountIds } = await User.findById(req.user._id);
    const accounts = await Account.find({ _id: { $in: accountIds } });
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
};

const addAccount = async (req, res, next) => {
  try {
    const { error, value } = addAccountSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const { name, amount, acceptsFunds, excludeFromTotal } = value;

    const nameInUse = await Account.findOne({
      user: req.user._id,
      name,
    });
    if (nameInUse) {
      throw new ConflictError("You've used that name already");
    }

    const user = await User.findById(req.user._id);
    if (user.accounts < 1 && acceptsFunds === false) {
      throw new BadRequestError('Your default account must accept funds');
    }

    const account = new Account({
      name,
      user: req.user._id,
      amount,
      acceptsFunds,
      excludeFromTotal,
    });

    await account.save();

    if (user.accounts < 1) {
      user.defaultAccount = account._id;
    }
    user.accounts.push(account._id);
    await user.save();

    res.status(201).json({ account });
  } catch (err) {
    next(err);
  }
};

const editAccount = async (req, res, next) => {
  try {
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      throw new NotFoundError('Account not found');
    }

    // Next few lines are to ensure validation works
    const mergedData = { ...account.toObject(), ...req.body };
    // Remove unwanted properties from mergedData
    delete mergedData._id;
    delete mergedData.user;
    delete mergedData.__v;

    const { error, value } = updateAccountSchema.validate(mergedData);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Use only the updated fields from the request body
    const updatedFields = {};
    for (const key in req.body) {
      updatedFields[key] = value[key];
    }

    const user = await User.findById(req.user._id);
    // Halt update if attempting to change 'acceptsFunds' to false on default acount
    if (
      user.defaultAccount.equals(req.params.accountId) &&
      value.acceptsFunds === false
    ) {
      throw new BadRequestError('Default account must accept funds');
    }

    // Finally, update the account
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.accountId,
      updatedFields,
      { new: true }
    );

    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);
    if (!account) {
      throw NotFoundError('Account not found');
    }

    const user = await User.findById(req.user._id);
    if (user.defaultAccount.equals(accountId)) {
      throw new BadRequestError('Cannot delete default account');
    }

    // find transactions that have the account as 'sendToAccount'
    const affectedTransactions = await Transaction.find({
      sendToAccount: account._id,
    });

    if (affectedTransactions.length) {
      for (let transaction of affectedTransactions) {
        transaction.sendToAccount = user.defaultAccount;
        await transaction.save();
      }
    }

    await Account.findByIdAndDelete(accountId);
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { accounts: accountId },
      },
      { new: true }
    );
    res.status(200).json({ deleted: accountId });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAccounts, addAccount, editAccount, deleteAccount };
