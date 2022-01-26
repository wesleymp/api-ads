const { Router } = require('express');

const useController = require('../controllers/userController');

const router = Router();

router.get('/', (_req, res) => {
  return res.status(200).json({ message: 'OK' });
});

router.get('/states', useController.getState);

module.exports = router;
