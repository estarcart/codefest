// Agrega un método render en la clase indexController
export default class indexController {
    constructor(view) {
        this.view = view;
    }

    render() {
        // Llama al método render de la vista
        const content = this.view.render();

        // Inserta el contenido en el elemento HTML
        document.getElementById('html').innerHTML = content;
    }
}
