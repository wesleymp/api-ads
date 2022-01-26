const { Router } = require('express');

const useController = require('../controllers/userController');
const signMiddleware = require('../middlewares/signupMiddleware');

const router = Router();

router.get('/', (_req, res) => {
  return res.status(200).json({ message: 'OK' });
});

router.get('/states', useController.getState);

router.post(
  '/signup',
  signMiddleware.validateName,
  signMiddleware.validateEmail,
  signMiddleware.validatePassword,
  signMiddleware.validateState,
  useController.signup,
);

module.exports = router;
