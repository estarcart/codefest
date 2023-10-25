class RegisterView{
    render(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pontilaunch</title>
            <link rel="stylesheet" href="../../public/css/register.css">
            <link rel="stylesheet" href="../../public/css/body.css">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        </head>
        <body>
            <main>
            <div class="container text-center">
                <div class="row">
                  <div class="col"></div>
                    <div class="col">
                        <div class="contenedor">
                            <div class="container-in">
                            <div class="logo">
                                <img src="img/logo.png" alt="Pontilaunch">
                            </div>
                            <div class="form">
                                <form action="http://localhost:3000/register" method="post">
                                    <input type="text" name="name" placeholder="Nombre" required>
                                    <input type="email" name="email" placeholder="Correo electronico" required>
                                    <input type="password" name="password" placeholder="Password" required>
                                    <input type="submit" value="Registrarse" class="registrar">
                                </form>
                                <div class="volver">
                                    <p>¿Ya tienes una cuenta? <a href="index.html">Regresar</a></p>
                                </div>
                            </div>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                    <div class="col"></div>
              </main>
        </body>
        </html>
        `;
        
        
    }
}