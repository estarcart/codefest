const express = require('express');
const router = express.Router();
const { getPublish, createPublish } = require('../controllers/publicationController.js')

router.get('/', (req, res) => {
  res.send('Ruta raiz de la API');
});

router.get('/publish', getPublish);

router.post('/upload', createPublish);

module.exports = router;

