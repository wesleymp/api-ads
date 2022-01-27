const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StateModel = require('../models/StateModel');
const UserModel = require('../models/UserModel');
const { genereteJWT } = require('../util/jwt');

const getState = async () => {
  const states = await StateModel.find();

  if (states.length === 0) {
    throw new Error('Nenhum estado registrado.');
  }

  return states;
};

const estateExist = async (state) => {
  return await StateModel.findById(mongoose.Types.ObjectId(state));
};

const emailAlreadyExist = async (email) => {
  return await UserModel.findOne({ email });
};

const signup = async (name, email, password, state) => {
  if (await emailAlreadyExist(email)) {
    throw new Error('Este email já está em uso.');
  }

  if (!mongoose.Types.ObjectId.isValid(state)) {
    throw new Error('ID do estado está inválido.');
  }

  if (!await estateExist(state)) {
    throw new Error('Estado não existe.');
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const dataToken = { name, email };

  const newUser = new UserModel({
    name: name,
    email: email,
    password: passwordHash,
    state: state,
    token: genereteJWT(dataToken),
  });

  await newUser.save();

  return { token: newUser.token };
};

const signin = async (email, password) => {
  const user = await emailAlreadyExist(email);

  if (!user) {
    throw new Error('Email ou senha inválidos.');
  }

  const matchPassword = bcrypt.compareSync(password, user.password);

  if (!matchPassword) {
    throw new Error('Email ou senha inválidos.');
  }

  const dataToken = { name: user.name, email };

  user.token = genereteJWT(dataToken);
  await user.save();

  return { token: user.token }
};

module.exports = {
  getState,
  signup,
  signin,
};
