const Account = require('../models/Account');
const User = require('../models/User');
const {
  addAccountSchema,
  updateAccountSchema,
} = require('../validation/joiSchemas');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
} = require('../errors/errors');

const addAccount = async (req, res, next) => {
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
};

const editAccount = async (req, res, next) => {
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
};

const deleteAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const account = await Account.findById(accountId);
    if (!account) {
      throw NotFoundError('Account not found');
    }
    await Account.findByIdAndDelete(accountId);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { accounts: accountId },
      },
      { new: true }
    );
    res.status(200).json({ msg: 'Account deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { addAccount, editAccount, deleteAccount };
