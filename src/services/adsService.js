const mongoose = require('mongoose');

require('dotenv').config();

const CategoryModel = require('../models/CategoryModel');
const UserModel = require('../models/UserModel');
const AdModel = require('../models/AdModel');
const StateModel = require('../models/StateModel');
const { parseMoney } = require('../util/parseMoney');
const { prepareImages } = require('../util/prepareImages');

const getCategories = async () => {
  const categories = await CategoryModel.find();

  if (categories.length === 0) {
    throw new Error('Nenhuma categoria registrada.');
  }

  const newCategories = categories.map((cat) => {
    return {
      ...cat._doc,
      image: `${process.env.BASE_URL}/assets/images/${cat.slug}.png`,
    };
  });

  return newCategories;
};

const addAd = async (
  authorization,
  title,
  price,
  priceneg,
  description,
  category,
  images,
) => {
  if (!mongoose.Types.ObjectId.isValid(category)) {
    throw new Error('ID da categoria inválido.');
  }

  const splitToken = authorization.split(' ');
  const token = splitToken[1];

  const user = await UserModel.findOne({ token  });

  if (!price || price === '') {
    price = 0;
  }

  if (!description) {
    description = 'Sem descrição';
  }

  const newAd = new AdModel({
    images: await prepareImages(images),
    title: title,
    price: parseMoney(price),
    priceNegotiable: priceneg == 'true' ? true : false,
    description: description,
    views: 0,
    status: true,
    dateCreated: new Date(),
    id_user: user._id.toString(),
    category: category,
    state: user.state,
  });

  if (newAd.images.length > 0) {
    newAd.images[0].default = true;
  }

  newAd.save();

  return newAd;
};

const listAds = async (sort, offset, limit, q, cat, state) => {
  const filters = {
    status: true,
  };

  if (q) {
    filters.title = { '$regex': q, '$options': 'i' };
  }

  if (cat) {
    const getCategory = await CategoryModel.findOne({ slug: cat });
    filters.category = getCategory._id.toString();
  }

  if (state) {
    const getState = await StateModel.findOne({ name: state.toUpperCase() });
    filters.state = getState._id.toString();
  }

  const dataAds = await AdModel
    .find(filters)
    .sort({ dateCreated: (sort.toLowerCase() === 'desc' ? -1 : 1) })
    .skip(parseInt(offset))
    .limit(parseInt(limit));

  const ads = dataAds.map((ad) => {
    return {
      id: ad._id,
      title: ad.title,
      price: ad.price,
      priceNegotiable: ad.priceNegotiable,
      image: ad.images.find((image) => image.default === true).url,
    };
  });

  return { ads, total: ads.length };
};

module.exports = {
  getCategories,
  addAd,
  listAds,
};
