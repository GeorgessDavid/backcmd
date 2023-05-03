window.addEventListener('load', () => {

    let submitButton = document.getElementById('submitButton')

    function send() {

        const radioButtons = document.querySelectorAll('input[name="sexo"]');
        let selectedValue;

        radioButtons.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.value;
            }
        });

        submitButton.setAttribute('disabled', 'disabled');

        submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Aguarde un momento...`

        window.removeEventListener('keydown', enviarConEnter)

        let inputs = {
            alias: document.getElementById('alias').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            dni: document.getElementById('dni').value,
            telefono: document.getElementById('telefono').value,
            domicilio: document.getElementById('domicilio').value,
            sexo: selectedValue,
            nacimiento: document.getElementById('datefield').value
        }

        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs)
        }
        
        fetch('https://cmedicosdavid.onrender.com/apiUsuarios/secretaria/addPaciente', request).then(p => {
            return p.json()
        }).then(data => {
            if (data.status == 201) {
                let timerInterval
                Swal.fire({
                    html: 'El paciente ha sido agregado exitosamente. Se redireccionará al home.',
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
                        window.location.href = "https://cmedicosdavid.onrender.com/prestadores/secretaria/home"
                    }
                })

                submitButton.innerHTML = `<i class="fa-solid fa-check fa-fade" style="color: #ffffff;"></i> Agregado.`
                submitButton.removeAttribute('disabled', 'disabled')
            } else if (data.status != 201) {
                const toastLiveExample = document.getElementById('liveToast')
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                submitButton.removeAttribute('disabled', 'disabled')
                submitButton.innerHTML = "Añadir paciente"
                let toastBody = document.getElementById('toast-text')
                let strong = document.querySelector('strong')

                if (data.errorType == 400) {
                    let errors = data.errors

                    toastBody.innerHTML = "Debe rellenar los campos obligatorios."
                    strong.innerHTML = "Error - Campos vacíos"
                    if (errors.alias) {
                        let alias = document.getElementById('alias')

                        alias.classList.add('inputError')

                        alias.setAttribute('placeholder', errors.alias.msg)
                    }

                    if (errors.nombre) {
                        let nombre = document.getElementById('nombre')

                        nombre.classList.add('inputError')

                        nombre.setAttribute('placeholder', errors.nombre.msg)
                    }

                    if (errors.apellido) {
                        let apellido = document.getElementById('apellido')

                        apellido.classList.add('inputError')

                        apellido.setAttribute('placeholder', errors.apellido.msg)
                    }

                    if (errors.email) {
                        let email = document.getElementById('email')

                        email.classList.add('inputError')

                        email.setAttribute('placeholder', errors.email.msg)
                    }

                    if (errors.dni) {
                        let dni = document.getElementById('dni')

                        dni.classList.add('inputError')

                        dni.setAttribute('placeholder', errors.dni.msg)
                    }

                    if (errors.telefono) {
                        let telefono = document.getElementById('telefono')

                        telefono.classList.add('inputError')

                        telefono.setAttribute('placeholder', errors.telefono.msg)
                    }

                    if (errors.domicilio) {
                        let domicilio = document.getElementById('domicilio')

                        domicilio.classList.add('inputError')

                        domicilio.setAttribute('placeholder', errors.domicilio.msg)
                    }

                    if (errors.sexo) {
                        let sexo = document.getElementById('sexo')

                        sexo.classList.add('inputError')

                        sexo.setAttribute('placeholder', errors.sexo.msg)
                    }

                    if (errors.nacimiento) {
                        let nacimiento = document.getElementById('nacimiento')

                        nacimiento.classList.add('inputError')

                        nacimiento.setAttribute('placeholder', errors.nacimiento.msg)
                    }


                }

                if (data.errorType === 400.3) {
                    let errors = data.errors

                    toastBody.innerHTML = "Revise la dirección de email."
                    strong.innerHTML = "Error - Email en uso"

                    let email = document.getElementById('email')

                    email.classList.add('inputError')

                    email.setAttribute('placeholder', errors.email.msg)
                }

                if (data.errorType === 400.2) {
                    let errors = data.errors

                    toastBody.innerHTML = "Revise el nombre de usuario."
                    strong.innerHTML = "Error - Nombre de usuario en uso"

                    let alias = document.getElementById('alias')

                    alias.classList.add('inputError')

                    alias.setAttribute('placeholder', errors.alias.msg)
                }


            }
        })

    }

    function enviarConEnter(tecla) {
        if (tecla.code == 'Enter' || tecla.code === 'NumpadEnter') {
            send();
        }
    }

    submitButton.addEventListener('click', send)
    window.addEventListener('keydown', enviarConEnter)
})