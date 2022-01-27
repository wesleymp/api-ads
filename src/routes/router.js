const { Router } = require('express');

const userController = require('../controllers/userController');
const adsController = require('../controllers/adsController');
const signupMiddleware = require('../middlewares/signupMiddleware');
const signinMiddleware = require('../middlewares/signinMiddleware');
const updateUserMiddleware = require('../middlewares/updateUserMiddleware');
const adsMiddleware = require('../middlewares/adsMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/', (_req, res) => {
  return res.status(200).json({ message: 'OK' });
});

router.get('/states', userController.getState);

router.post(
  '/signup',
  signupMiddleware.validateName,
  signupMiddleware.validateEmail,
  signupMiddleware.validatePassword,
  signupMiddleware.validateState,
  userController.signup,
);

router.post(
  '/signin',
  signinMiddleware.validateEmail,
  signinMiddleware.validatePassword,
  userController.signin,
);

router.get(
  '/user/me',
  authMiddleware,
  userController.info,
);

router.put(
  '/user/me',
  updateUserMiddleware.validateName,
  updateUserMiddleware.validatePassword,
  updateUserMiddleware.validateState,
  authMiddleware,
  userController.updateInfo,
);

router.get('/categories', adsController.getCategories);

router.post(
  '/ad/add',
  authMiddleware,
  adsMiddleware.validateTitle,
  adsMiddleware.validateCategory,
  adsController.addAd,
);

module.exports = router;
