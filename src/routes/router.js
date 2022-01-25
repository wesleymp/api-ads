const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
  return res.status(200).json({ message: 'OK' });
});

router.use((_req, res) => {
  return res.status(404).json({ code: 'NOT_FOUND', error: 'Rota não encontrada.' })
})

module.exports = router;
