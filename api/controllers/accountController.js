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
    const account = await Account.findById(req.params.accountId);

    if (!account) {
      throw new NotFoundError('Account not found');
    }

    // Merge existing account data with the request body
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
    if (account.defaultAccount) {
      throw new BadRequestError('You cannot delete the default account');
    }
    await Account.findByIdAndDelete(accountId);
    await User.findByIdAndUpdate(
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
