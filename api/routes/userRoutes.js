const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {
  createUser,
  loginUser,
  checkRefreshToken,
  logoutUser,
  getUserInfo,
  editUser,
} = require('../controllers/userController');

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

router.post('/', asyncHandler(createUser));
router.put('/', isLoggedIn, asyncHandler(editUser));
router.post('/login', asyncHandler(loginUser));
router.get('/refreshToken', checkRefreshToken);
router.post('/logout', logoutUser);
router.get('/:userId', isLoggedIn, isAuthorised, asyncHandler(getUserInfo));

module.exports = router;
