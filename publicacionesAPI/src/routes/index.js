const express = require('express');
const router = express.Router();

// Definir una ruta
router.get('/', (req, res, next) => {
  // Tu lógica de manejo de la solicitud aquí
  res.send('Ruta raíz de la API');
});

module.exports = router;
