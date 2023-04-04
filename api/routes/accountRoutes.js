const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {
  getAccounts,
  addAccount,
  editAccount,
  deleteAccount,
} = require('../controllers/accountController');

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

router.get('/', isLoggedIn, asyncHandler(getAccounts));
router.post('/', isLoggedIn, asyncHandler(addAccount));
router.put('/:accountId', isLoggedIn, isAuthorised, asyncHandler(editAccount));
router.delete(
  '/:accountId',
  isLoggedIn,
  isAuthorised,
  asyncHandler(deleteAccount)
);

module.exports = router;
