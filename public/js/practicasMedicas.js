window.addEventListener('load', () => {

    let container = document.getElementById('divPracticasMedicas')

    fetch('https://dh-grupo3.onrender.com/tratamientos/api').then(response => {
        return response.json()
    }).then(datos => {

        let spinner = document.getElementById('loadingSpinner')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')

        for (let i = 0; i < datos.data.length; i++) {
            container.innerHTML += `<div class="itemBox">
            <h2>${datos.data[i].nombre}</h2>
            
            <div class="buttons">

            <div class="modalsDiv">
            <!-- Editar Modal -->
            <div>
                <a class="editButton" data-bs-toggle="modal" data-bs-target="#Edit${i}">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i>
                </a>
                <form action="/tratamientos/update/${datos.data[i].id}?_method=PUT" method="POST">
                <div class="modal fade" id="Edit${i}" data-bs-keyboard="true" tabindex="-1" aria-labelledby="modalTitleEditar${i}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar práctica médica</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">Práctica Médica</span>
                            <input type="text" name="practicaNombre" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="${datos.data[i].nombre}">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Editar</button>
                    </div>
                    
                </div>
                </div>
                </div>
                </form>
            </div>
            

            <!-- Eliminar modal -->
            <div class="deleteButton">
                <a class="trashButton"data-bs-toggle="modal" data-bs-target="#miModal${i}">
                    <i class="fa-regular fa-trash-can fa-xl"></i>
                </a>

                <div class="modal fade" id="miModal${i}" data-bs-keyboard="true" tabindex="-1" aria-labelledby="modalTitle${i}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmar eliminación</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalInfo">
                        ¿Está seguro que desea eliminar la practica de <b>${datos.data[i].nombre}</b>?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <form action="/tratamientos/delete/${datos.data[i].id}?_method=DELETE" method="POST" id="deleteForm${i}">
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>`

        }
    })

    let button = document.getElementById('addButton')



    button.addEventListener('click', async (e) => {
        let errores = [];

        let inputNombre = document.getElementById('addPracticaMedicaInput')


        if (inputNombre.value == "") {
            errores.push('Debe introducir el nombre de la práctica.')
        }

        if (errores.length != 0) {
            e.preventDefault()

            let divInput = document.getElementById('divInput')

            inputNombre.style.border = "1px red solid !important"

            divInput.innerHTML += `<h6>${errores}</h6>`

            divInput.style.color = "red"
        } else {

            let informacion = {
                tratamiento: inputNombre.value
            }

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(informacion)
            };


            fetch("https://dh-grupo3.onrender.com/tratamientos/create", requestOptions)
                .then(response => {
                    return response.json()
                }).then(info => {
                    if (info.status == 201) {
                        let timerInterval
                        Swal.fire({
                            html: 'La práctica médica ha sido creada exitosamente. Se recargará la página.',
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
                    } else {
                        let timerInterval
                        Swal.fire({
                            html: 'UPS! Hubo un inconveniente.',
                            timerProgressBar: true,
                            background: '#fa9d9d',
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
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    })
})