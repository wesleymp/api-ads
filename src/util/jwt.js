const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

const genereteJWT = (data) => {
  const config = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = sign({ ...data }, process.env.JWT_SECRET, config);

  return token;
};

const verifyToken = (token) => {
  return verify(token, process.env.JWT_SECRET);
};

module.exports = {
  verifyToken,
  genereteJWT,
};
