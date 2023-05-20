window.addEventListener('load', () => {
    let container = document.getElementById('main-container')

    fetch('https://cmedicosdavid.onrender.com/especialidades/api').then(res => {
        return res.json()
    }).then(r => {
        for (let i = 0; i < r.data.length; i++) {
            const e = r.data[i];
            const profesional = e.especialidad;
            let spinner = document.getElementById('loadingSpinner')

            spinner.style.visibility = 'hidden';
            spinner.style.opacity = '0';
            spinner.style.display = 'none'
            container.innerHTML += `
            <div class="col-3">
            <div class="mb-3 ms-5 card-div">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${e.nombre.toUpperCase()}</h5>
                        <div id="medicos${i}"></div>
                    </div>
                </div>
            </div>
            `


            let p = 'medicos' + [i]
            let medicos = document.getElementById(p)

            if (e.especialidad.length > 0) {
                if (profesional.length > 1) {
                    for (let l = 0; l < profesional.length; l++) {
                        const medico = profesional[l];

                        let prof = {
                            nombre: medico.nombre,
                            apellido: medico.apellido,
                            sexo: medico.sexo ? 'Masculino' : 'Femenino'
                        }

                        let prefix = prof.sexo == 'Masculino' ? 'Dr.' : 'Dra.'
                        medicos.innerHTML += `<p class="card-text">${prefix} ${prof.nombre} ${prof.apellido}</p>`
                    }
                } else {

                    let prof = {
                        nombre: e.especialidad[0].nombre,
                        apellido: e.especialidad[0].apellido,
                        sexo: e.especialidad[0].sexo ? 'Masculino' : 'Femenino'
                    }

                    let prefix = prof.sexo == 'Masculino' ? 'Dr.' : 'Dra.'

                    medicos.innerHTML += `<p class="card-text">${prefix} ${prof.nombre} ${prof.apellido}</p>`
                }
            } else {
                medicos.innerHTML = `<p class="card-text"> No disponible actualmente</p>`
            }
        }
    })
})