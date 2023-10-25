//MVC Frontend index.js with express 
const express = require('express');
const app = express();

const port = 8000;

// Ruta de archivos estáticos (HTML, CSS, JS)
app.use(express.static('./public'));

const indexController = require('./controllers/indexController');
app.get('/', indexController.index);

const registerController = require('./controllers/registerController');
app.get('/register', registerController.register);

app.listen(port, () => {
  console.log('Servidor escuchando en el puerto ' + port);
});