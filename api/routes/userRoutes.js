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
const { createUserSchema, loginUserSchema } = require('../validation/joiSchemas')

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

router.post('/login', asyncHandler(async (req, res, next) => {
	try {
		const { error, value } = loginUserSchema.validate(req.body);
		if (error) {
			throw new BadRequestError(error.details[0].message);
		}
		const { username, password } = value;
		const user = await User.findOne({ username });
      if (!user) {
        throw new BadRequestError('Username or password is incorrect');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestError('Username or password is incorrect');
      }
			const refreshToken = generateRefreshToken(user._id);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
			res.status(200).json({
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
		next(err)
	}
}))

module.exports = router;