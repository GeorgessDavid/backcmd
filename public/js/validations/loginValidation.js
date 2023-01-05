Window.addEventListener('load', function() {
    let formulario = document.querySelector("loginForm");
 
    let loginInput = {
        username: document.getElementByclassName('loginUser'),
        password: document.getElementByclassName('loginPass'),
        submit: document.getElementByclassName('logInButton')
    }

    formulario.addEventListener('submit', function(e) {
        let errores = [];   
        
        
        if (loginInput.loginUser.value == "") {
           errores.push('Debe introducir un nombre de usuario.')
           //document.querySelector(".loginUser").innerHTML = "Debe introducir un nombre de usuario" 
        }

        if (loginInput.loginPass.value == "") { // asignar el evento onfocus al input contraseña
            errores.push('Debe introducir una contraseña.')
        } else if (inputs.password.value.length < 6) {
            errores.push('La contraseña debe tener, como mínimo, 6 caracteres alfanuméricos.')
        }

        if (errores.length != 0) {
            e.preventDefault();

            let divAlert = document.getElementById("divAlert")

            divAlert.classList.remove('displayNone')

            let ulErrores = document.getElementById("errores")

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `<li>${errores[i]}</li>`
            }
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 1500
              })
        }

    })

})

 