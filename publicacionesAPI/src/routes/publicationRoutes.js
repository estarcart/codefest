const express = require('express');
const router = express.Router();
const {getPublish} = require('../controllers/publicationController.js')

router.get('/', (req, res) => {
  res.send('Ruta raiz de la API');
});

router.get('/publish', getPublish);

module.exports = router;

