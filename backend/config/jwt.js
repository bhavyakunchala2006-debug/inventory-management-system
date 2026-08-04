module.exports = {
  secret: process.env.JWT_SECRET || 'fallback_jwt_secret',
  expire: process.env.JWT_EXPIRE || '7d',
};
