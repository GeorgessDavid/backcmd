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

function mostrarPacientes(pacientes) {
    let container = document.getElementById('divPacientes')
    container.innerHTML = ''
    for (let i = 0; i < pacientes.length; i++) {
        const pac = pacientes[i];

        container.innerHTML += `
        <div class="itemBox">
        <h2>${pac.apellido.toUpperCase()}, ${pac.nombre} - <em style="font-size: 16px">DNI: ${pac.dni}</em></h2>
        <button><a href="/historiaClinica/${pac.alias}" target="__blank">Abrir Historia Clínica <i class="fa-solid fa-arrow-up-right-from-square"></i></a></button>
        </div>
        `
    }
}