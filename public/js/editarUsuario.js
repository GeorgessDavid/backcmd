window.addEventListener('load', () => {

    let userType = document.getElementById('userType')

    let medicData = document.getElementById('medicData')

    let alias = document.getElementById('alias').value

    let form = document.getElementById('formEditUser')

    if (userType.value == 3) {
        let direccion = "https://dh-grupo3.onrender.com/apiUsuarios/profesional/" + alias
        fetch(direccion).then(res => {
            return res.json()
        }).then(datos => {
            medicData.innerHTML = `
            <h3>Datos del Médico</h3>
                <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">Especialidad*</label>
                    <select class="form-select" aria-label="Default select example" name="especialidad" id="especialidadSelect">
                            <option selected value="${datos.data.especialidad.id}">${datos.data.especialidad[0].nombre}</option>
                    </select>
                </div>
                <div>
                    <div class="col">
                        <label>Matrícula*</label>
                        <div class="input-group mb-3">
                            <span class="input-group-text">M.N.</span>
                            <input type="text" name="matricula" class="form-control" aria-label="Text input with dropdown button" value="${datos.data.matricula}"placeholder="Máximo 6 dígitos.">
                        </div>
                    </div>
                </div>`
            let especialidadSelect = document.getElementById('especialidadSelect')
            fetch('https://dh-grupo3.onrender.com/especialidades/api').then(res => {
                return res.json()
            }).then(datos => {
                for (let i = 0; i < datos.data.length; i++) {
                    const element = datos.data[i];
                    especialidadSelect.innerHTML += `<option value="${element.id}">${element.nombre}</option>`
                }
            })
        })
    }

    userType.addEventListener('click', () => {
        console.log(userType.value)

        if (userType.value == 3) {
            medicData.style.display = "block"
        } else {
            medicData.style.display = "none"
        }
    })

    form.addEventListener('submit', (e) => {
        let timerInterval
        Swal.fire({
            html: 'El usuario se ha modificado con éxito, redireccionando al listado de usuarios.',
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
    })
})