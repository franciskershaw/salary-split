const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {
  addAccount,
  editAccount,
  deleteAccount,
} = require('../controllers/accountController');

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

router.post('/', isLoggedIn, asyncHandler(addAccount));
router.put('/:accountId', isLoggedIn, isAuthorised, asyncHandler(editAccount));
router.delete(
  '/:accountId',
  isLoggedIn,
  isAuthorised,
  asyncHandler(deleteAccount)
);

module.exports = router;
