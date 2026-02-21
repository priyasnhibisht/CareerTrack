module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '7d',
  BCRYPT_ROUNDS: 10,
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  },
};
