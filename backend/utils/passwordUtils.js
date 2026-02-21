const bcrypt = require('bcrypt');
const { BCRYPT_ROUNDS } = require('../config/constants');

const hashPassword = async (password) => {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
};

const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
