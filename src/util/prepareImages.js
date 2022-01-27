const { v4: uuidv4 } = require('uuid');
const jimp = require('jimp');

require('dotenv').config();

const mimetypes = ['image/jpg', 'image/jpeg'];

const addImage = async (buffer) => {
  const newName = `${uuidv4()}.jpg`;
  const tmpImage = await jimp.read(buffer);

  tmpImage
    .cover(500, 500)
    .quality(80)
    .write(`./public/media/${newName}`);

  return newName;
}

const sigleImage = async (images) => {
  if (!mimetypes.includes(images.mimetype)) {
    throw new Error('Tipo de imagem inválido.')
  }

  const dataImage =  {
    name: await addImage(images.data),
    url: `${process.env.BASE_URL}/media/${await addImage(images.data)}`,
    default: false,
  };

  return [dataImage];
};

const multImages = async (images) => {
  const listImages = [];

  for(let i = 0; i < images.length; i += 1) {
    if (!mimetypes.includes(images[i].mimetype)) {
      throw new Error('Tipo de imagem inválido.')
    }

    const dataImage =  {
      name: await addImage(images[i].data),
      url: `${process.env.BASE_URL}/media/${await addImage(images[i].data)}`,
      default: false,
    };

    listImages.push(dataImage);
  }

  return listImages;
};

const prepareImages = async (images) => {
  if (images.length === undefined) {
    return await sigleImage(images);
  }

  return await multImages(images);
}

module.exports = {
  prepareImages,
};
