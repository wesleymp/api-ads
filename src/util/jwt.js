const { verify } = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};

module.exports = {
  verifyToken,
};
