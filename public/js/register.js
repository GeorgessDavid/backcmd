let inputs = {
    alias: document.getElementById('alias'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    showPassword: document.getElementById('showPassword'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    dni: document.getElementById('dni'),
    domicilio: document.getElementById('domicilio'),
    provincia: document.getElementById('provincia'),
    telefono: document.getElementById('telefono'),
    email: document.getElementById('email'),
    confirmarEmail: document.getElementById('confirmarEmail'),
    sexo: document.getElementById('sexo'),
    obraSocial: document.getElementById('obraSocial'),
    nacimiento: document.getElementById('nacimiento')
}
let provincias = []

window.addEventListener('load', () => {
    let provinciasOptions = document.getElementById('provincia')
    fetch('https://apis.datos.gob.ar/georef/api/provincias').then(r => {
        return r.json()
    }).then(datos => {
        for (let i = 0; i < datos.provincias.length; i++) {
            let provincia = datos.provincias[i].nombre

            provincias.push(datos.provincias[i])
            provinciasOptions.innerHTML += `<option value=${datos.provincias[i].id}>${provincia}</option>`
        }
    })
})

// MOSTRAR CONTRASEÑA
inputs.showPassword.addEventListener('click', function (e) {
    const passwordCurrentType = inputs.password.getAttribute('type');
    const secondPassCurrentType = inputs.confirmPassword.getAttribute('type');

    if (passwordCurrentType === 'text' && secondPassCurrentType === 'text') {
        inputs.password.setAttribute('type', 'password');
        inputs.confirmPassword.setAttribute('type', 'password');
    } else {
        inputs.password.setAttribute('type', 'text');
        inputs.confirmPassword.setAttribute('type', 'text');
    }

})

// VALIDACIÓN DE USUARIO
inputs.alias.addEventListener('input', function () {
    let aliasValue = inputs.alias.value;

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    if (patron.test(aliasValue)) {
        inputs.alias.value = aliasValue;
    } else {
        let nuevoValor = aliasValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/g, '');
        inputs.alias.value = nuevoValor;
    }

    if (aliasValue.length == 0) {
        inputs.alias.classList.add('error')
        inputs.alias.classList.remove('correct')
    } else {
        inputs.alias.classList.add('correct')
        inputs.alias.classList.remove('error')
    }
})


// VALIDACIÓN DE CONTRASEÑA
let div = document.getElementById('h6extra')


inputs.password.addEventListener('input', () => {
    let passwordValue = inputs.password.value;

    if (passwordValue.length < 6) {
        inputs.password.classList.add('error');
        div.innerHTML = `<h6 style="color:red; text-transform: none; font-size: 15px">La contraseña debe tener como mínimo 6 caracteres.</h6>`
    } else {
        inputs.password.classList.remove('error')
        div.innerHTML = ''
    }
})

inputs.confirmPassword.addEventListener('input', function () {

    let passwordValue = inputs.password.value;
    let confirmPasswordValue = inputs.confirmPassword.value;

    if (passwordValue != confirmPasswordValue) {
        inputs.confirmPassword.classList.add('error');
        inputs.confirmPassword.classList.remove('correct')
        inputs.password.classList.remove('correct')

        div.innerHTML = `<h6 style="color: red; text-transform: none; font-size: 15px">Las contraseñas no coinciden.</h6>`
    } else {
        inputs.confirmPassword.classList.add('correct')
        inputs.password.classList.add('correct')
        inputs.confirmPassword.classList.remove('error');

        div.innerHTML = `<h6 style="color:rgba(0, 184, 0, 0.797); text-transform: none; font-size: 15px">Las contraseñas coinciden.</h6>`

    }
})

// VALDIACIÓN DE NOMBRE

inputs.nombre.addEventListener('input', function () {
    let nameValue = inputs.nombre.value

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (patron.test(nameValue)) {
        inputs.nombre.value = nameValue
    } else {
        let nuevoValor = nameValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/g, '');
        inputs.nombre.value = nuevoValor;
    }

    if (nameValue.length <= 0) {
        inputs.nombre.classList.add('error');
        inputs.nombre.classList.remove('correct');
    } else {
        inputs.nombre.classList.add('correct');
        inputs.nombre.classList.remove('error');
    }
})

// VALIDACIÓN DE APELLIDO

inputs.apellido.addEventListener('input', function () {
    let apellidoValue = inputs.apellido.value

    let patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (patron.test(apellidoValue)) {
        inputs.apellido.value = apellidoValue;
    } else {
        let nuevoValor = apellidoValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+/g, '')
        inputs.apellido.value = nuevoValor
    }

    if (apellidoValue.length == 0) {
        inputs.apellido.classList.add('error');
        inputs.apellido.classList.remove('correct');
    } else {
        inputs.apellido.classList.add('correct');
        inputs.apellido.classList.remove('error');
    }

})

// VALIDACIÓN DE DNI

inputs.dni.addEventListener('input', function () {
    let div = document.getElementById('dniError')
    if (inputs.dni.value.length < 5 || inputs.dni.value.length > 8) {
        inputs.dni.classList.add('error');

        div.innerHTML = `<h6 style="color: red; text-transform: none; font-size: 15px">Por favor, introduzca un número de documento válido</h6>`

        inputs.dni.classList.remove('correct')
    } else {
        div.innerHTML = ''

        inputs.dni.classList.add('correct');
        inputs.dni.classList.remove('error')
    }

})

// VALIDACIÓN DE DOMICILIO

inputs.domicilio.addEventListener('input', function () {
    if (inputs.domicilio.value.length == 0) {
        inputs.domicilio.classList.add('error');
        inputs.domicilio.classList.remove('correct')
    } else {
        inputs.domicilio.classList.add('correct');
        inputs.domicilio.classList.remove('error')
    }
})

// VALIDACIÓN DE PROVINCIA

inputs.provincia.addEventListener('focus', () => {

    window.addEventListener('click', () => {
        if (inputs.provincia.value == 0) {
            inputs.provincia.classList.add('error')
            inputs.provincia.classList.remove('correct')
        } else {
            inputs.provincia.classList.add('correct');
            inputs.provincia.classList.remove('error');
        }
    })
})

// VALIDACIÓN DE TELÉFONO 

inputs.telefono.addEventListener('input', () => {

    let telefonoDiv = document.getElementById('telefonoDiv')
    if (inputs.telefono.value.length < 8 || inputs.telefono.value.length > 14) {
        telefonoDiv.innerHTML = `<h6 style="color: red; text-transform: none; font-size: 15px">Por favor introduzca un número de teléfono válido. No necesita poner el código de país (+54).</h6>`
        inputs.telefono.classList.add('error');
        inputs.telefono.classList.remove('correct');
    } else {
        telefonoDiv.innerHTML = ''
        inputs.telefono.classList.add('correct')
        inputs.telefono.classList.remove('error');
    }
})

// VALIDACIÓN DE E-MAIL
let emailValidation = document.getElementById('emailValidation')

inputs.email.addEventListener('input', () => {

    if (inputs.email.value.length == 0 || !inputs.email.value.includes("@")) {
        inputs.email.classList.add('error');
        inputs.email.classList.remove('correct')
        emailValidation.innerHTML = `<h6 style="color: red; text-transform: none; font-size: 15px">Por favor introduzca una dirección de e-mail válida. </h6>`
    } else {
        inputs.email.classList.add('correct');
        inputs.email.classList.remove('error')
        emailValidation.innerHTML = ''
    }
})

inputs.confirmarEmail.addEventListener('input', () => {


    let emailValue = inputs.email.value;
    let confirmarEmailValue = inputs.confirmarEmail.value;

    if (confirmarEmailValue != emailValue) {
        inputs.confirmarEmail.classList.add('error');
        inputs.confirmarEmail.classList.remove('correct');
        inputs.email.classList.add('error');
        emailValidation.innerHTML = `<h6 style="color: red; text-transform: none; font-size: 15px"> La dirección de e-mail no coincide. </h6>`
    } else {
        inputs.confirmarEmail.classList.add('correct');
        inputs.confirmarEmail.classList.remove('error');
        inputs.email.classList.remove('error')
        emailValidation.innerHTML = ''
    }

})

// VALIDACIÓN DE SEXO

inputs.sexo.addEventListener('focus', () => {

    window.addEventListener('click', () => {

        let sexoCurrentValue = inputs.sexo.value;

        if (sexoCurrentValue == 0) {
            inputs.sexo.classList.add('error');
            inputs.sexo.classList.remove('correct')
        } else {
            inputs.sexo.classList.add('correct')
            inputs.sexo.classList.remove('error')
        }
    })

})

// VALIDACIÓN DE OBRA SOCIAL

inputs.obraSocial.addEventListener('focus', () => {

    window.addEventListener('click', () => {

        let obraSocialCurrentValue = inputs.obraSocial.value;

        if (obraSocialCurrentValue == 0) {
            inputs.obraSocial.classList.add('error');
            inputs.obraSocial.classList.remove('correct')
        } else {
            inputs.obraSocial.classList.add('correct')
            inputs.obraSocial.classList.remove('error')
        }
    })

})

// VALIDACIÓN DE NACIMIENTO

inputs.nacimiento.addEventListener('focus', () => {
    window.addEventListener('click', () => {
        let nacimientoCurrentValue = inputs.nacimiento.value;

        if (nacimientoCurrentValue.length == '') {
            inputs.nacimiento.classList.add('error');
            inputs.nacimiento.classList.remove('correct')
        } else {
            inputs.nacimiento.classList.add('correct');
            inputs.nacimiento.classList.remove('error')
        }
    })
})

// REGISTRARSE BUTTON

let button = document.getElementById('sendButton')

window.addEventListener('click', function () {
    let error = document.querySelectorAll('.error');
    let correct = document.querySelectorAll('.correct');

    if (error.length == 0 && correct.length >= 13) {
        button.removeAttribute('disabled', 'disabled');
    } else {
        button.setAttribute('disabled', 'disabled');
    }
})

button.addEventListener('click', () => {
    let provinciaSelected = provincias.filter(ch => {
        return inputs.provincia.value === ch.id
    })

    let body = {
        alias: inputs.alias.value,
        password: inputs.password.value,
        nombre: inputs.nombre.value,
        apellido: inputs.apellido.value,
        email: inputs.email.value,
        dni: inputs.dni.value,
        domicilio: inputs.domicilio.value + ', ' + provinciaSelected[0].nombre,
        telefono: inputs.telefono.value,
        sexo: inputs.sexo.value,
        nacimiento: inputs.nacimiento.value,
        obraSocial: inputs.obraSocial.value
    }


    console.log(body)
    button.setAttribute('disabled', 'disabled');

    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Aguarde un momento...`


    console.log(body)

    let req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/addUser', req).then(response => {
        return response.json()
    }).then((data) => {
        let status = data.status
        let errorType = data.errorType
        if (status == 201) {
            let timerInterval
            Swal.fire({
                html: 'Te has registrado exitosamente! Se te redirigirá al inicio.',
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
                    window.location.href = "https://cmedicosdavid.onrender.com/"
                }
            })
            button.setAttribute('disabled', 'disabled')
            button.innerHTML = `<i class="fa-solid fa-check fa-fade" style="color: #ffffff;"></i> Registrado exitosamente. Redirigiendo...`
        } else if (status != 201) {
            let errors = data.errors
            button.innerHTML = 'REGISTRARSE'
            button.removeAttribute('disabled', 'disabled')
            const toastLiveExample = document.getElementById('liveToast')
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            let toastBody = document.getElementById('toast-text')
            let toastTitle = document.querySelector('strong')

            if (errorType == 400.3) {
                toastTitle.innerHTML = 'Error - Email no disponible.'
                toastBody.innerHTML = errors.alias.msg
                inputs.email.classList.add('error')
                inputs.confirmarEmail.classList.add('error')
                inputs.email.classList.remove('correct')
                inputs.confirmarEmail.classList.remove('correct')
            }

            if (errorType == 400.2){
                toastTitle.innerHTML = 'Error - Usuario no disponible.'
                toastBody.innerHTML = errors.alias.msg
                inputs.alias.classList.add('error')
                inputs.alias.classList.remove('correct')
            }

            if(errorType == 400){
                toastTitle.innerHTML = 'Error - Campos vacíos'
                toastBody.innerHTML = 'Debes completar todos los campos del formulario.'
            }

            $('body,html').animate({
                scrollTop: 0
            }, 200);
        }
    })
})