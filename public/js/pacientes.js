window.addEventListener('load', () => {
    let container = document.getElementById('divPacientes')

    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/pacientes').then(response => {
        return response.json()
    }).then(datos => {

        let paciente = datos.data

        let spinner = document.getElementById('loadingSpinner')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')

        for (let i = 0; i < paciente.length; i++) {
            const pac = paciente[i];
            
            container.innerHTML += `
            <div class="itemBox">
            <h2>${pac.apellido.toUpperCase()}, ${pac.nombre} - <em style="font-size: 16px">DNI: ${pac.dni}</em></h2>
            <button><a href="/historiaClinica/${pac.alias}" target="__blank">Abrir Historia Clínica</a></button>
            </div>
            `
        }
    })
})