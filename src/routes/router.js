const { Router } = require('express');

const userController = require('../controllers/userController');
const signupMiddleware = require('../middlewares/signupMiddleware');
const signinMiddleware = require('../middlewares/signinMiddleware');
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

module.exports = router;
