// Importa las vistas, modelos y controladores necesarios
import registerView from '../views/registerView';
import registerController from './controllers/registerController';

// Crea instancias de modelos, vistas y controladores
const registerView = new registerView();
const registerController = new registerController(registerView);

// Escucha el evento de envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtén los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Crea un objeto que contiene los datos del formulario
    const formData = {
        email: email,
        password: password
    };

    // Realiza la solicitud a la API utilizando fetch
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ajusta el encabezado según la necesidad de la API
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // La solicitud se realizó con éxito
            // Redirige a la página de registro utilizando la función del controlador
            registerController.renderRegisterPage();
        } else {
            // La solicitud falló
            // Puedes mostrar un mensaje de error al usuario o realizar otras acciones según la respuesta de la API
            console.error('Error en la solicitud a la API');
        }
    } catch (error) {
        // Manejo de errores de la solicitud
        console.error('Error en la solicitud a la API:', error);
    }
});

