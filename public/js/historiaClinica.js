let sendButton = document.getElementById('saveButton')
let alias = document.getElementById('alias')
let nuevosDatos = document.getElementById('descripcioninput')
let guardarCambios = document.getElementById('guardarCambios')
let previousData = document.getElementById('historiaClinicaPrevia')
nuevosDatos.addEventListener('input', () => {
    guardarCambios.removeAttribute('disabled', 'disabled')
})

window.addEventListener('load', () => {
    console.log(previousData.value)
})




function successAlert() {
    let timerInterval
    Swal.fire({
        html: 'Los cambios se han guardado correctamente. Se recargará la página',
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

    sendButton.innerHTML = `<i class="fa-solid fa-check fa-fade" style="color: #ffffff;"></i> Modificado.`
    sendButton.removeAttribute('disabled', 'disabled')
}

function errorAlert() {

    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
    sendButton.removeAttribute('disabled', 'disabled')
    sendButton.innerHTML = "Guardar"
    let toastBody = document.getElementById('toast-text')
    let strong = document.querySelector('strong')

    toastBody.innerHTML = "Ha ocurrido un error. Intentelo más tarde."
    strong.innerHTML = "Error"
}

sendButton.addEventListener('click', () => {
    sendButton.setAttribute('disabled', 'disabled')
    sendButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Espere...`

    let data = {
        alias: alias.value,
        nuevosDatos: nuevosDatos.value,
    }

    if (previousData.value != 1) {
        let request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3005/historiaClinica/createHistoria', request).then(p => {
            return p.json()
        }).then(data => {
            if (data.status == 201) {
                successAlert()
            } else if (data.status != 201) {
                errorAlert()
            }
        })
    } else {
        let request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        fetch('http://localhost:3005/historiaClinica/updateHistoria', request).then(p => {
            return p.json()
        }).then(data => {
            if (data.status == 201) {
                successAlert()
            } else if (data.status != 201) {
                errorAlert()
            }
        })
    }
})

