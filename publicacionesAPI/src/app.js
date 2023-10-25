const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: 'src/config/.env' });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar y usar las rutas de tu aplicación
const routes = require('./routes/publicationRoutes.js');
app.use(routes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

// Obtener el puerto desde las variables de entorno
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
