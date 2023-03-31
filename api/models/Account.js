const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  defaultAccount: {
    type: Boolean,
    required: true,
  },
  acceptsFunds: {
    type: Boolean,
    required: true,
    default: true,
  },
  excludeFromTotal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
