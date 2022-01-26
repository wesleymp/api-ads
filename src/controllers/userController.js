const userService = require('../services/userService');

const getState = async (_req, res) => {
  try {
    const states = await userService.getState();

    return res.status(200).json({ data: states });
  } catch (error) {
    return res.status(404).json({ err: error.message });
  }
};

module.exports = {
  getState,
};
