const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/tokenUtils');
const UserModel = require('../models/User');
const { HTTP_STATUS } = require('../config/constants');

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const passwordHash = await hashPassword(password);
    const user = await UserModel.createUser(name, email, passwordHash);
    const token = generateToken(user.id);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.findUserById(userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
};
