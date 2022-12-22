window.addEventListener("load", function () {

    let formulario = document.getElementById("formAddUser")

    let inputs = {
        username: document.getElementById('alias'),
        password: document.getElementById('password'),
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        email: document.getElementById('email'),
        documento: document.getElementById('dni'),
        telefono: document.getElementById('telefono'),
        domicilio: document.getElementById('inputAddress')
    }

    formulario.addEventListener('submit', function(e) {
        let errores = [];   
        
        if (inputs.username.value == "") {
            errores.push('Debe introducir un nombre de usuario.')
        }

        if (inputs.password.value == "") {
            errores.push('Debe introducir una contraseña.')
        } else if (inputs.password.value.length < 6) {
            errores.push('La contraseña debe tener, como mínimo, 6 caracteres alfanuméricos.')
        }

        if (inputs.nombre.value == "") {
            errores.push('Debe introducir un nombre.')
        }

        if (inputs.apellido.value == "") {
            errores.push('Debe introducir el apellido.')
        }

        if (inputs.email.value == "") {
            errores.push('Debe introducir un email.')
        } else if (!inputs.email.value.includes("@")) {
            errores.push('Debe introducir una dirección de mail válida.')
        }

        if (inputs.documento.value == "") {
            errores.push("Debe introducir el número de documento.")
        } else if (inputs.documento.value < 5) {
            errores.push("Debe introducir un número de documento válido. Revise la cantidad de dígitos.")
        }

        if (inputs.telefono.value == "") {
            errores.push("Debe introducir un número de teléfono.")
        } else if (inputs.telefono.value.length < 8) {
            errores.push("Debe introducir un número de teléfono válido. Revise la cantidad de dígitos.")
        }

        if (inputs.domicilio.value == "") {
            errores.push("Debe introducir un domicilio.")
        }

        if (errores.length != 0) {
            e.preventDefault();

            let divAlert = document.getElementById("divAlert")

            divAlert.classList.remove('displayNone')

            let ulErrores = document.getElementById("errorList")

            for (let i = 0; i < errores.length; i++) {
                ulErrores.innerHTML += `
                    <li>${errores[i]}</li>
              `
            }
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario agregado exitosamente!',
                showConfirmButton: false,
                timer: 1500
              })
        }

    })

})