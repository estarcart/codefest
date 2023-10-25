import IndexView from './js/views/indexView.js';
import IndexController from './js/controllers/indexController.js';

const indexView = new IndexView();
const indexController = new IndexController(indexView);

indexController.render();