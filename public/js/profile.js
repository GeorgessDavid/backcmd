let inputs = {
    alias: document.getElementById('alias'),
    tipoDeUsuario: document.getElementById('tipoDeUsuario'),
    oldPassword: document.getElementById('oldPassword'),
    newPassword: document.getElementById('newPassword'),
    newPasswordRepeat: document.getElementById('newPasswordRepeat'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    email: document.getElementById('email'),
    domicilio: document.getElementById('domicilio'),
    dni: document.getElementById('dni'),
    telefono: document.getElementById('telefono')
}

let changeButton = document.getElementById('changeButton')



inputs.newPassword.addEventListener('change', () => {
    inputs.newPasswordRepeat.addEventListener('input', () => {
        let contrasena = document.getElementById('contrasena')

        if (inputs.newPasswordRepeat.value != inputs.newPassword.value) {
            contrasena.innerHTML = 'Las contraseñas no coinciden'
            contrasena.style.color = 'red'

            inputs.newPasswordRepeat.style.borderColor = "red"
            inputs.newPasswordRepeat.style.borderStyle = 'solid'
            inputs.newPasswordRepeat.style.borderWidth = "1px"
            inputs.newPasswordRepeat.style.boxShadow = "0 0 10px red"
        } else {
            contrasena.innerHTML = 'Las contraseñas coinciden'
            contrasena.style.color = 'green'

            inputs.newPasswordRepeat.style.borderColor = "green"
            inputs.newPasswordRepeat.style.borderStyle = 'solid'
            inputs.newPasswordRepeat.style.borderWidth = "1px"
            inputs.newPasswordRepeat.style.boxShadow = "0 0 5px green"


            inputs.newPassword.style.borderColor = "green"
            inputs.newPassword.style.borderStyle = 'solid'
            inputs.newPassword.style.borderWidth = "1px"
            inputs.newPassword.style.boxShadow = "0 0 5px green"
        }
    })
})

changeButton.addEventListener('click', () => {
    changeButton.setAttribute('disabled', 'disabled')
    changeButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Espere...`

    let data = {
        alias: inputs.alias.value,
        oldPassword: inputs.oldPassword.value,
        newPassword: inputs.newPassword.value
    }

    let request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    let url = 'https://cmedicosdavid.onrender.com/apiUsuarios/changePassword/' + data.alias

    fetch(url, request).then(response => {
        return response.json()
    }).then(result => {
        if (result.status == 201) {
            let timerInterval
            Swal.fire({
                html: 'La contraseña ha sido cambiada, se redirigirá al inicio de sesión.',
                timer: 2000,
                timerProgressBar: true,
                background: '#9effd0',
                position: 'top-end',
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                    window.location.href = "https://cmedicosdavid.onrender.com/pacientes/login"
                }
            })

            changeButton.innerHTML = `<i class="fa-solid fa-check fa-fade" style="color: #ffffff;"></i> Modificado.`
            changeButton.removeAttribute('disabled', 'disabled')
        } else if (result.status != 201) {

            if (result.status == 401) {
                let contrasenaOld = document.getElementById('contrasenaOld')

                contrasenaOld.innerHTML = result.error

                inputs.oldPassword.style.borderColor = "red"
                inputs.oldPassword.style.borderStyle = 'solid'
                inputs.oldPassword.style.borderWidth = "1px"
                inputs.oldPassword.style.boxShadow = "0 0 10px red"


                changeButton.removeAttribute('disabled', 'disabled')
                changeButton.innerHTML = "Cambiar"
            } else {
                if (result.error.oldPassword) {
                    let contrasenaOld = document.getElementById('contrasenaOld')

                    contrasenaOld.innerHTML = result.error.oldPassword.msg
                    contrasenaOld.style.color = 'red'

                    inputs.oldPassword.style.borderColor = "red"
                    inputs.oldPassword.style.borderStyle = 'solid'
                    inputs.oldPassword.style.borderWidth = "1px"
                    inputs.oldPassword.style.boxShadow = "0 0 10px red"
                } else if (result.error.newPassword) {
                    contrasena.innerHTML = result.error.newPassword.msg
                    contrasena.style.color = 'red'

                    inputs.newPassword.style.borderColor = "red"
                    inputs.newPassword.style.borderStyle = 'solid'
                    inputs.newPassword.style.borderWidth = "1px"
                    inputs.newPassword.style.boxShadow = "0 0 10px red"
                }


                changeButton.removeAttribute('disabled', 'disabled')
                changeButton.innerHTML = "Cambiar"
            }
        }
    })
})

let button = document.getElementById('dataChangeButton')

inputs.nombre.addEventListener('change', () => {
    inputs.nombre.style.borderColor = 'blue'
    inputs.nombre.style.borderWidth = '1px'
    inputs.nombre.style.borderStyle = 'solid'
    inputs.nombre.style.boxShadow = '0 0 5px blue'
    button.removeAttribute('disabled', 'disabled')
})
inputs.apellido.addEventListener('change', () => {
    inputs.apellido.style.borderColor = 'blue'
    inputs.apellido.style.borderWidth = '1px'
    inputs.apellido.style.borderStyle = 'solid'
    inputs.apellido.style.boxShadow = '0 0 5px blue'
    button.removeAttribute('disabled', 'disabled')

})

inputs.email.addEventListener('change', () => {
    inputs.email.style.borderColor = 'blue'
    inputs.email.style.borderWidth = '1px'
    inputs.email.style.borderStyle = 'solid'
    inputs.email.style.boxShadow = '0 0 5px blue'
    button.removeAttribute('disabled', 'disabled')

})

inputs.dni.addEventListener('change', () => {
    inputs.dni.style.borderColor = 'blue'
    inputs.dni.style.borderWidth = '1px'
    inputs.dni.style.borderStyle = 'solid'
    inputs.dni.style.boxShadow = '0 0 5px blue'
    button.removeAttribute('disabled', 'disabled')

})

inputs.telefono.addEventListener('change', () => {
    inputs.telefono.style.borderColor = 'blue'
    inputs.telefono.style.borderWidth = '1px'
    inputs.telefono.style.borderStyle = 'solid'
    inputs.telefono.style.boxShadow = '0 0 5px blue'
    button.removeAttribute('disabled', 'disabled')

})

inputs.domicilio.addEventListener('change', () => {
    inputs.domicilio.style.borderColor = 'blue'
    inputs.domicilio.style.borderWidth = '1px'
    inputs.domicilio.style.borderStyle = 'solid'
    inputs.domicilio.style.boxShadow = '0 0 5px blue'
    button.removeAttribute('disabled', 'disabled')
})

button.addEventListener('click', () => {
    button.setAttribute('disabled', 'disabled')
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Espere...`

    let url = 'https://cmedicosdavid.onrender.com/apiUsuarios/updateUser/' + inputs.alias.value

    let request = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            alias: inputs.alias.value,
            nombre: inputs.nombre.value,
            apellido: inputs.apellido.value,
            email: inputs.email.value,
            domicilio: inputs.domicilio.value,
            dni: inputs.dni.value,
            telefono: inputs.telefono.value
        })
    }

    fetch(url, request).then(res => {
        return res.json()
    }).then(result => {
        if(result.status == 201){
            let timerInterval
            Swal.fire({
                html: 'Los cambios se han guardado, se recargará la página.',
                timer: 2000,
                timerProgressBar: true,
                background: '#9effd0',
                position: 'top-end',
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                    location.reload()
                }
            })
        }else{

            button.innerHTML = 'Guardar Cambios'
            button.removeAttribute('disabled', 'disabled')

            if(result.errors.nombre){
                let h6 = document.getElementById('nombreText')

                h6.innerHTML = result.errors.nombre.msg
                inputs.nombre.classList.add('inputError')
            }

            if(result.errors.apellido){
                
                let h6 = document.getElementById('apellidoText')

                h6.innerHTML = result.errors.apellido.msg
                inputs.apellido.classList.add('inputError')
            }

            if(result.errors.email){
                
                let h6 = document.getElementById('emailText')

                h6.innerHTML = result.errors.email.msg
                inputs.email.classList.add('inputError')
            }

            if(result.errors.dni){
                
                let h6 = document.getElementById('dniText')

                h6.innerHTML = result.errors.dni.msg
                inputs.dni.classList.add('inputError')
            }

            if(result.errors.domicilio){
                
                let h6 = document.getElementById('domicilioText')

                h6.innerHTML = result.errors.domicilio.msg
                inputs.domicilio.classList.add('inputError')
            }

            if(result.errors.telefono){
                
                let h6 = document.getElementById('telefonoText')

                h6.innerHTML = result.errors.telefono.msg
                inputs.telefono.classList.add('inputError')
            }
        }
    })
})

