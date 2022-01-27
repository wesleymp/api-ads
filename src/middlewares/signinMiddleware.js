const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!regex.test(email)) {
    return res.status(400).json({ err: 'Email inválido.' });
  }

  next();
}

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (typeof password !== 'string') {
    return res.status(400).json({ err: 'A senha deve ser uma string.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ err: 'A senha deve conter pelo menos 6 carateres.' });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
}
