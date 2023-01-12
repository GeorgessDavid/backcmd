window.addEventListener("load", function () {
    let formulario = document.getElementById("pacientesRegister")
    let inputs = {
        usuario: document.getElementById('usuarioId'),
        password: document.getElementById('passwordId'),
        nombre: document.getElementById('nombreId'),
        apellido: document.getElementById('apellidoId'),
        documento: document.getElementById('dniId'),
        email: document.getElementById('emailId'),
    }
    formulario.addEventListener('submit', function(e) {
        let errores = [];
        if (inputs.username.value == "") {
            errores.push('Debe introducir un nombre de usuario.')
        }
        if (inputs.password.value == "") {
            errores.push('Debe introducir una contraseña.')
        } else if (inputs.password.value.length < 8) {
            errores.push('La contraseña debe tener, como mínimo, 8 caracteres alfanuméricos.')
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
        if (errores.length != 0) {
            e.preventDefault();
            let divError = document.getElementById("divError")
            divError.innerHTML += `<h2 class="errors">${errores}</h2>`
        }
    })

})
