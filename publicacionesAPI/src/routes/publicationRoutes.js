const express = require('express');
const router = express.Router();
const path = require('path');

const { getPublish, createPublish, getPublishImg } = require('../controllers/publicationController.js')

router.get('/', (req, res) => {
  res.send('Ruta raiz de la API');
});

router.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../../uploads', filename);
  res.sendFile(filePath);
});

router.get('/publish', getPublish);

router.post('/upload', createPublish);

router.get('/publishImg', getPublishImg);

module.exports = router;

