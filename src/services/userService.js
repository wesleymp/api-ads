const stateModel = require('../models/stateModel');

const getState = async () => {
  const states = await stateModel.find();

  if (states.length === 0) {
    throw new Error('Nenhum estado registrado.');
  }

  return states;
};

module.exports = {
  getState,
};
