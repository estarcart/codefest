// Importa las vistas, modelos y controladores necesarios
import registerView from './views/registerView';
import registerController from './controllers/registerController';
import indexController from './controllers/indexController';

const registerView = new registerView();
const registerController = new registerController(registerView);
const indexController = new indexController();


// Inicializa la aplicación
indexController.render();
