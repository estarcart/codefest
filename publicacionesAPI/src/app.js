const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: 'src/config/.env'});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/publicationRoutes.js');
app.use(routes);

app.use((err, req, res, next) => {
  console.error(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
