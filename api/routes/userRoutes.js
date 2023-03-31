const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require('../helper/helper');
const asyncHandler = require('express-async-handler');
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require('../errors/errors');
const { createUserSchema } = require('../validation/joiSchemas')

const User = require('../models/User');

router.post('/', asyncHandler(async (req, res, next) => {
	try {
		const { error, value } = createUserSchema.validate(req.body);
		if (error) {
			throw new BadRequestError(error.details[0].message);
		}

		const { username, name, password } = value;

		const userExists = await User.findOne({ username });
		if (userExists) {
			throw new ConflictError('User already exists');
		}
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// Create user
		const user = await User.create({
			username,
			name,
			password: hashedPassword,
		});

		// Send refresh token
		const refreshToken = generateRefreshToken(user._id);
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		});

		res.status(201).json({
			userInfo: {
				_id: user._id,
				username: user.username,
				name: user.name,
				monthlySalary: user.monthlySalary,
				transactions: user.transactions,
				accounts: user.accounts,
			},
			accessToken: generateAccessToken(user._id)
		});
	} catch (err) {
		next(err);
	}
}))

module.exports = router;