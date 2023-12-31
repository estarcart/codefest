export default class IndexView {
    constructor(rootElement) {
      this.rootElement = rootElement;
    }
  
    render() {
      return `<html id="html" lang="en">
  
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Pontilaunch</title>
              <link rel="stylesheet" href="../public/css/index.css">
              <link rel="stylesheet" href="../public/css/body.css">
              <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          
          <body>
              <main>
                  <div class="container text-center">
                      <div class="row">
                              <div class="contenedor">
                                  <div class="container-in">
                                      <div class="logo">
                                          <h5>Pontilaunch</h5>
                                      </div>
                                      <div class="form">
                                          <form id="loginForm" action="http://localhost:3000/login" method="post">
                                              <input type="email" name="email" id="email" placeholder="Correo electronico"
                                                  required>
                                              <input type="password" name="password" id="password" placeholder="Password"
                                                  required>
                                              <input type="submit" value="Iniciar Sesion" class="iniciar">
                                          </form>
                                          <div class="register">
                                              <p>¿No tienes una cuenta? <a id="goToRegister" href="#">Regístrate</a></p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
              </main>
          </body>
          
          </html>
          `;
    }
  
    // Agrega un evento de clic al enlace "Regístrate"
    addRegisterLinkEventListener() {
      const registerLink = this.rootElement.querySelector('#goToRegister');
      registerLink.addEventListener('click', () => {
        // Llama a una función para cambiar a la vista de registro
        this.changeToRegisterView();
      });
    }
  
    // Función para cambiar a la vista de registro
    changeToRegisterView() {
      // Aquí puedes llamar a una función del controlador o navegar a la vista de registro
      // Por ahora, simplemente recargamos la página (puedes reemplazar esto con una redirección)
      window.location.replace('/register');
    }
  }