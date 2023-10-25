const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('src/routes/index');
app.use('/userAPI', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

