const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {
  createUser,
  loginUser,
  checkRefreshToken,
  logoutUser,
  getUserInfo,
} = require('../controllers/userController');

const { isLoggedIn, isAuthorised } = require('../middleware/authMiddleware');

router.post('/', asyncHandler(createUser));
router.post('/login', asyncHandler(loginUser));
router.get('/refreshToken', checkRefreshToken);
router.post('/logout', logoutUser);
router.get('/:userId', isLoggedIn, isAuthorised, asyncHandler(getUserInfo));

module.exports = router;
