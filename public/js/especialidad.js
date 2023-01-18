window.addEventListener('load', () => {

    let container = document.getElementById('divEspecialidades')

    fetch("https://dh-grupo3.onrender.com/especialidades/api")
        .then((response) => {
            return response.json();
        })
        .then((datos) => {


            for (let i = 0; i < datos.data.length; i++) {

                container.innerHTML += `<div class="itemBox">
                    <h2>${datos.data[i].nombre}</h2>
                    <div class="buttons">

                        <!-- Editar Modal -->
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Edit${i}">
                                Editar
                            </button>

                            <div class="modal fade" id="Edit${i}" data-bs-keyboard="true" tabindex="-1" aria-labelledby="modalTitleEditar${i}" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Especialidad</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="inputGroup-sizing-default">Especialidad</span>
                                        <input type="text" name="especialidad" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value="${datos.data[i].nombre}">
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <form action="/especialidad/editar/:id?_method=PUT" method="POST">
                                        <button type="button" class="btn btn-primary">Editar</button>
                                    </form
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        

                        <!-- Eliminar modal -->
                        <div>
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#miModal${i}">
                                Eliminar
                            </button>

                            <div class="modal fade" id="miModal${i}" data-bs-keyboard="true" tabindex="-1" aria-labelledby="modalTitle${i}" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmar eliminación</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="modalInfo">
                                    ¿Está seguro que desea eliminar la especialidad de <b>${datos.data[i].nombre}</b>?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <form action="/especialidad/eliminar/:id?_method=DELETE" method="POST">
                                        <button type="button" class="btn btn-danger">Eliminar</button>
                                    </form
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>`

            }
        })
        .catch((err) => {
            console.log(err)
        })
})