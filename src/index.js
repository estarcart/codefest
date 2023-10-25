//MVC Frontend index.js with express 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Ruta de archivos estáticos (HTML, CSS, JS)
app.use(express.static('./public'));

const homeController = require('./controllers/homeController');
app.get('/', homeController.index);

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});