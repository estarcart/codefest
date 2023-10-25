import IndexView from './js/views/indexView.js';
import IndexController from './js/controllers/indexController.js';
//import RegisterView from './js/views/registerView.js';
//import RegisterController from './js/controllers/registerController.js';

const indexView = new IndexView();
const indexController = new IndexController(indexView);
//const registerView = new RegisterView();
//const registerController = new RegisterController(registerView);

indexController.render();
//registerController.render();