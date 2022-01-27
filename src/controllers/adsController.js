const adsService = require('../services/adsService');

const getCategories = async (_req, res) => {
  try {
    const categorys = await adsService.getCategories();

    return res.status(200).json({ data: categorys });
  } catch (error) {
    return res.status(404).json({ err: error.message });
  }
};

const addAd = async (req, res) => {
  const { title, price, priceneg, description, category } = req.body;
  const { authorization } = req.headers;

  let images = '';
  if (req.files) {
    images = req.files.images;
  }

  try {
    const dataAds = await adsService.addAd(
      authorization,
      title,
      price,
      priceneg,
      description,
      category,
      images,
    );

    return res.status(200).json({ data: dataAds });
  } catch (error) {
    return res.status(404).json({ err: error.message });
  }
};

module.exports = {
  getCategories,
  addAd,
};
