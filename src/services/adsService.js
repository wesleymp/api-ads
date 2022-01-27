const CategoryModel = require('../models/CategoryModel');

require('dotenv').config();

const getCategories = async () => {
  const categories = await CategoryModel.find();

  if (categories.length === 0) {
    throw new Error('Nenhuma categoria registrada.');
  }

  const newCategories = [];

  for(let i in categories) {
    newCategories.push({
      ...categories[i]._doc,
      image: `${process.env.BASE_URL}/assets/images/${categories[i].slug}.png`,
    });
  };

  return newCategories;
};

module.exports = {
  getCategories,
};
