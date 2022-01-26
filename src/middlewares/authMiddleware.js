const { verifyToken } = require('../util/jwt');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const splitToken = authorization.split(' ');
  const token = splitToken[1];

  if (!token) {
    return res.status(401).json({ err: 'Nenhum token encontrado.' });
  }

  try {
    verifyToken(token);
  } catch (error) {
    error.message = 'Token Inválido';
    return res.status(401).json({ err: error.message });
  }

  next();
};

module.exports = authMiddleware;
