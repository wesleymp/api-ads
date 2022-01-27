const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ err: 'Informe um nome.' });
  }

  if (typeof name !== 'string') {
    return res.status(400).json({ err: 'O nome do usuário deve ser uma string.' });
  }

  if (name.length < 2) {
    return res.status(400).json({ err: 'O nome do usuário deve conter pelo menos 2 carateres.' });
  }

  next();
}

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!regex.test(email)) {
    return res.status(400).json({ err: 'Email inválido.' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password, password_confirmation } = req.body;

  if (!password || password === '' || !password_confirmation || password_confirmation === '') {
    return res.status(400).json({ err: 'Informe uma senha.' });
  }

  if (typeof password !== 'string' || typeof password_confirmation !== 'string') {
    return res.status(400).json({ err: 'A senha deve ser uma string.' });
  }

  if (password.length < 6 || password_confirmation.length < 6) {
    return res.status(400).json({ err: 'A senha deve conter pelo menos 6 carateres.' });
  }

  if (password !== password_confirmation) {
    return res.status(400).json({ err: 'As senhas devem ser iguais.' });
  }

  next();
};

const validateState = (req, res, next) => {
  const { state } = req.body;

  if (!state || state === '') {
    return res.status(400).json({ err: 'Informe o ID do estado.' });
  }

  if (typeof state !== 'string') {
    return res.status(400).json({ err: 'O id do estado deve ser uma string.' });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateState,
}
