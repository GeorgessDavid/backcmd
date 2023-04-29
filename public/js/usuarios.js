window.addEventListener('load', () => {
    let container = document.getElementById('usuariosListado')

    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/allUsers').then(response => {
        return response.json()
    }).then(datos => {
        let spinner = document.getElementById('loadingSpinner')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')
        for (let i = 0; i < datos.data.length; i++) {
            let usuario = datos.data[i];

            if(usuario.sexo == true){
                usuario.sexo = "Masculino"
            }else{
                usuario.sexo = "Femenino"
            }

            container.innerHTML += `
            <div class="accordion mb-3" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" style="background-color: rgb(243, 243, 243);" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                    <div class="userBox">
                        <img src="/img/profilepictures/${usuario.imagen}">
                        <h2>${usuario.apellido.toUpperCase()}, ${usuario.nombre} - <em style="font-size: 15px">${usuario.rol.nombre}</em></h2>
                    </div>
                </button>
                </h2>
                <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body" style="background-color: rgb(248, 248, 248)" >
                    <div class="d-flex justify-content-evenly">
                        <div class="d-flex flex-column mb-3">
                            <h5><b>Usuario</b>: ${usuario.alias} </h5>
                            <h5><b>Tipo de Usuario:</b> ${usuario.rol.nombre}</h5>
                            <h5><b>Nombre</b>: ${usuario.nombre} </h5>
                            <h5><b>Apellido</b>: ${usuario.apellido} </h5>
                        </div>
                        <div class="d-flex flex-column mb-3">
                            <h5><b>DNI</b>: ${usuario.dni} </h5>
                            <h5><b>Domicilio</b>: ${usuario.domicilio} </h5>
                            <h5><b>Sexo</b>: ${usuario.sexo} </h5>
                            <h5><b>Nacimiento</b>: ${usuario.nacimiento} </h5>
                        </div>
                        <div class="d-flex flex-column mb-3" id="tercerColumna${i}">
                            <h5><b>Email</b>: ${usuario.email} </h5>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                            <a class="btn btn-primary" href="/prestadores/editandoPrestador/${usuario.id}" style="color: white; text-decoration: none; margin-right:10px;"><i class="fa-solid fa-pen-to-square"></i> Editar</a>
                            <a class="btn btn-danger"data-bs-toggle="modal" data-bs-target="#miModal${i}">
                                <i class="fa-regular fa-trash-can fa-xl"></i> Eliminar
                            </a>
                            <div class="modal fade" id="miModal${i}" data-bs-keyboard="true" tabindex="-1" aria-labelledby="modalTitle${i}" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmar eliminación</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="modalInfo">
                                    ¿Está seguro que desea eliminar a<b> ${usuario.alias}</b>?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <form action="/prestadores/home/confirmDelete/${usuario.id}?_method=DELETE" method="POST" id="deleteForm${i}">
                                        <button type="submit" class="btn btn-danger">Eliminar</button>
                                    </form
                                </div>
                            </div>
                            </div>
                    </div> 
                </div>
                </div>
            </div>
            </div>`

            if(usuario.Rol_id == 3){
                let docs = "tercerColumna"+i

                let col = document.getElementById(docs)

                col.innerHTML += `<h5><b>Especialidad</b>: ${usuario.especialidad[0].nombre}</h5>`

                if(usuario.tratamiento.length != 0 && usuario.tratamiento.length > 1){

                    col.innerHTML += `
                    <div style="display: flex; flex-direction: column;" id="lola">
                    <h5><b>Prácticas Médicas</b>: </h5>
                    </div>`

                    let text = document.getElementById('lola')

                    for (let i = 0; i < usuario.tratamiento.length; i++) {
                        const w = usuario.tratamiento[i];
                        
                        text.innerHTML += "<span> "+ w.nombre + "</span>"
                    }
                }else if(usuario.tratamiento.length == 1){
                    col.innerHTML += `<h5><b>Prácticas Médicas</b>: <i>${usuario.tratamiento[0].nombre}</i></h5>`

                }else{
                    col.innerHTML += `<h5><b>Prácticas Médicas</b>: <i>Ninguna.</i> <h5>`
                }
            }
        }
    })
})