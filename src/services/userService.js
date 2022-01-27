const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StateModel = require('../models/StateModel');
const UserModel = require('../models/UserModel');
const AdModel = require('../models/AdModel');
const CategoryModel = require('../models/CategoryModel');
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

const info = async (authorization) => {
  const splitToken = authorization.split(' ');
  const token = splitToken[1];

  const user = await UserModel.findOne({ token });
  const state = await StateModel.findById(user.state);
  const ads = await AdModel.find({ id_user: user._id.toString() });

  const adList = [];

  for (let i in ads) {
    const category = await CategoryModel.findById(mongoose.Types.ObjectId(ads[i].category));

    adList.push({ ...ads[i], category: category.slug });
  }

  return {
    name: user.name,
    email: user.email,
    state: state.name,
    ads: adList,
  };
};

const updateInfo = async (authorization, name, password, state) => {
  const splitToken = authorization.split(' ');
  const token = splitToken[1];

  const userData = {};

  if (name) userData.name = name;
  if (password) userData.password = bcrypt.hashSync(password, 10);
  if (state) {
    if (!mongoose.Types.ObjectId.isValid(state)) throw new Error('ID do estado está inválido.');
    const checkState = await StateModel.findById(mongoose.Types.ObjectId(state));

    if (!checkState) throw new Error('Estado não existe.');

    userData.state = state;
  }

  await UserModel.findOneAndUpdate({ token }, { $set: userData });
};

module.exports = {
  getState,
  signup,
  signin,
  info,
  updateInfo,
};
