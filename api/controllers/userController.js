const bcrypt = require('bcryptjs');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require('../helper/helper');
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require('../errors/errors');
const {
  createUserSchema,
  loginUserSchema,
} = require('../validation/joiSchemas');
const User = require('../models/User');

const createUser = async (req, res, next) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    const { username, name, monthlySalary, password } = value;

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
      monthlySalary,
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
      accessToken: generateAccessToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
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
      accessToken: generateAccessToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

const checkRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken)
    throw new UnauthorizedError('No refresh token', 'NO_TOKEN');
  const refreshToken = cookies.refreshToken;
  try {
    const { _id } = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(_id);
    res.json({ accessToken: accessToken, _id });
  } catch (error) {
    res.clearCookie('refreshToken');
    throw new UnauthorizedError('Issues validating the token', 'INVALID_TOKEN');
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'User logged out' });
};

const getUserInfo = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      throw new NotFoundError('User not found');
    }
    const user = await User.findById(req.params.userId);
    res.status(200).json({
      userInfo: {
        _id: user._id,
        username: user.username,
        name: user.name,
        monthlySalary: user.monthlySalary,
        transactions: user.transactions,
        accounts: user.accounts,
      },
      accessToken: generateAccessToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  checkRefreshToken,
  logoutUser,
  getUserInfo,
};
