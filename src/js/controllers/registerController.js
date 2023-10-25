// registerController.js
class RegisterController {
    constructor(view) {
        this.view = view;
    }

    // Método para renderizar la vista de registro
    renderRegisterPage() {
        // Llama al método render de la vista para obtener el contenido HTML
        const registerPageHTML = this.view.render();

        // Borra el contenido HTML existente en la página
        const appElement = document.getElementById('html'); // Ajusta el ID según la estructura de tu página
        appElement.innerHTML = '';

        // Inserta el HTML de la vista de registro en el elemento del documento
        appElement.innerHTML = registerPageHTML;
    }

    // Agrega otros métodos para controlar la interacción con la vista y el modelo si es necesario.
}
