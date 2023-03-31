const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

router.post('/', isLoggedIn, asyncHandler(addTransaction));
router.put(
  '/:transactionId',
  isLoggedIn,
  isAuthorised,
  asyncHandler(editTransaction)
);
router.delete(
  '/:transactionId',
  isLoggedIn,
  isAuthorised,
  asyncHandler(deleteTransaction)
);

module.exports = router;
