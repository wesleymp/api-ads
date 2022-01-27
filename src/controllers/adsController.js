const adsService = require('../services/adsService');

const getCategories = async (_req, res) => {
  try {
    const categorys = await adsService.getCategories();

    return res.status(200).json({ data: categorys });
  } catch (error) {
    return res.status(404).json({ err: error.message });
  }
};

module.exports = {
  getCategories,
};
