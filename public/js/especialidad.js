window.addEventListener('load', () => {

    let container = document.getElementById('divEspecialidades')

    fetch("http://localhost:3005/especialidades/api")
        .then((response) => {
            return response.json();
        })
        .then((datos) => {


            for (let i = 0; i < datos.data.length; i++) {

                container.innerHTML += `<div class="itemBox">
                    <h2>${datos.data[i].nombre}</h2>
                    <div class="buttons">

                        <!-- Editar Modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal${i}Editando">
                            Editar
                        </button>

                        <!-- Eliminar modal -->

                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#miModal${i}">
                            Eliminar
                        </button>

                        <div class="modal fade" id="miModal${i}" data-bs-backdrop="static" data-bs-keyboard="true" tabindex="-1" aria-labelledby="modalTitle${i}" aria-hidden="true">
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