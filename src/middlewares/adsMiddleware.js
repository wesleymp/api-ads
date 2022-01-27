const validateTitle = (req, res, next) => {
  const { title } = req.body;

  if (!title || title === '') {
    res.status(400).json({ err: 'Informe um titulo.' });
  }

  next();
};

const validateCategory = (req, res, next) => {
  const { category } = req.body;

  if (!category || category === '') {
    res.status(400).json({ err: 'Informe uma categoria.' });
  }

  next();
};

module.exports = {
  validateTitle,
  validateCategory,
};
