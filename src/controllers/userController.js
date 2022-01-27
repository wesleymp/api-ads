const userService = require('../services/userService');

const getState = async (_req, res) => {
  try {
    const states = await userService.getState();

    return res.status(200).json({ data: states });
  } catch (error) {
    return res.status(404).json({ err: error.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password, state } = req.body;

  try {
    const signupData = await userService.signup(name, email, password, state);

    return res.status(201).json({ message: 'Usuário registrado com sucesso!', data: signupData });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const signinData = await userService.signin(email, password);

    return res.status(200).json({ message: 'Login efetuado com sucesso!', data: signinData });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  getState,
  signup,
  signin,
};
