window.addEventListener('load', () => {
    let container = document.getElementById('divPacientes')

    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/pacientes').then(response => {
        return response.json()
    }).then(datos => {

        let paciente = datos.data

        let spinner = document.getElementById('loadingSpinner')

        let searchInput = document.getElementById('searchInput')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')

        mostrarPacientes(paciente)


        searchInput.addEventListener('input', () => {
            let query = searchInput.value.trim().toLowerCase()
            let resultados = paciente.filter(pac => {
                return (
                    pac.nombre.toLowerCase().includes(query) ||
                    pac.apellido.toLowerCase().includes(query) ||
                    pac.dni.toString().includes(query)
                )
            })
            mostrarPacientes(resultados)
        })
    })
})

let pagination = {
    currentPage: 1,
    patientsPerPage: 20,
}
function mostrarPacientes(pacientes) {
    let container = document.getElementById('divPacientes')
    container.innerHTML = ''

    const startIndex = (pagination.currentPage - 1) * pagination.patientsPerPage
    const endIndex = startIndex + pagination.patientsPerPage
    const patientsToShow = pacientes.slice(startIndex, endIndex)

    for (let i = 0; i < patientsToShow.length; i++) {
        const pac = patientsToShow[i];

        container.innerHTML += `
    <div class="itemBox">
        <h2>${pac.apellido.toUpperCase()}, ${pac.nombre} - <em style="font-size: 16px">DNI: ${pac.dni}</em></h2>
        <button><a href="/prestadores/profesional/pacientes/historiaClinica/${pac.id}" target="__blank">Abrir Historia Clínica <i class="fa-solid fa-arrow-up-right-from-square"></i></a></button>
    </div>
    `
    }
    const totalPages = Math.ceil(pacientes.length / pagination.patientsPerPage)

    let paginationContainer = document.createElement('div')
    paginationContainer.className = 'd-flex justify-content-center'

    let currentPage = document.createElement('p')
    currentPage.innerText = `Página ${pagination.currentPage} de ${totalPages}`
    currentPage.style.margin = '20px'
    paginationContainer.appendChild(currentPage)

    let previousButton = document.createElement('button')
    previousButton.innerText = 'Anterior'
    previousButton.className = 'btn btn-success'
    previousButton.style.margin = '20px'
    previousButton.disabled = pagination.currentPage === 1
    previousButton.addEventListener('click', () => {
        pagination.currentPage -= 1
        mostrarPacientes(pacientes)
    })

    paginationContainer.appendChild(previousButton)

    let nextButton = document.createElement('button')
    nextButton.innerText = 'Siguiente'
    nextButton.className = 'btn btn-success'
    nextButton.style.margin = '20px'
    nextButton.disabled = pagination.currentPage === totalPages
    nextButton.addEventListener('click', () => {
        pagination.currentPage += 1
        mostrarPacientes(pacientes)
    })

    paginationContainer.appendChild(nextButton)

    container.appendChild(paginationContainer)
}