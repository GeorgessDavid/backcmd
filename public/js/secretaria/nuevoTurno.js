let dni = document.getElementById('paciente')
let sugerencias = document.getElementById('sugerencias');
let profesionales = document.getElementById('profesional');
let practicaMedica = document.getElementById('practicaMedicaModal')
let horarios = document.getElementById('horarios');

window.addEventListener('load', function () {
    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/pacientes').then(r => {
        return r.json()
    }).then(res => {
        paciente = res.data;
        dni.addEventListener('input', () => {
            mostrarSugerencias()

            if (dni.value == '') {
                ocultarSugerencias()
            }
            window.addEventListener('click', () => {
                ocultarSugerencias()
            })

            let dniValue = dni.value.trim()

            let resultados = paciente.filter(pac => {
                return (pac.dni.includes(dniValue))
            })
            if (resultados.length != 0) {
                mostrarPacientes(resultados)
            } else {
                sugerencias.innerHTML = `<span class="ms-3" style="font-size: 16px; font-style: italic;">Paciente no encontrado. </span>`
            }
        })
    })

    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/profesionales/').then(r => {
        return r.json()
    }).then(e => {
        prof = e.data

        listarMedicos(prof)


        profesionales.addEventListener('change', () => {
            let value = profesionales.value

            let profSelected = prof.filter(e => {
                return(e.profesional.id == value)
            })

            listarHorarios(profSelected[0].horarios[0].horarios)
        })

    })

    fetch('https://cmedicosdavid.onrender.com/tratamientos/api/').then(r => {
        return r.json()
    }).then(e => {
        prac = e.data

        listarPracticasMedicas(prac)


    })

})



function mostrarSugerencias() {

    sugerencias.style.display = "block"
}

function ocultarSugerencias() {
    sugerencias.style.display = "none"
}


function mostrarPacientes(pacientes) {


    sugerencias.innerHTML = ''
    for (let i = 0; i < pacientes.length; i++) {
        const pac = pacientes[i];

        sugerencias.innerHTML += `<li value="${pac.id}">${pac.apellido.toUpperCase()}, ${pac.nombre} - DNI: ${pac.dni} </li>`
    }

    let li = document.querySelector('div#sugerencias li')

    li.addEventListener('click', () => {
        let id = li.value

        pacienteData(id, pacientes)
    })

}

function pacienteData(documento, pacie) {
    let pacienteInfo = document.getElementById('pacienteInfo')

    let p = pacie.filter(pac => {
        return (pac.id === documento)
    })

    pacienteInfo.style.display = 'block'

    pacienteInfo.innerHTML = `<div class="d-flex ms-3">
    <label for="nombre" class="">Nombre:</label>
    <span class="ms-3">${p[0].nombre}</span>
</div>
<div class="d-flex ms-3">
    <label for="apellido">Apellido:</label>
    <span class="ms-3">${p[0].apellido}</span>
</div>
<div class="d-flex ms-3">
    <label for="apellido">Documento:</label>
    <span class="ms-3">${p[0].dni}</span>
</div>`
}

function listarMedicos(medico) {
    for (let i = 0; i < medico.length; i++) {
        const profesional = medico[i];

        profesionales.innerHTML += `<option value="${profesional.profesional.id}">${profesional.profesional.apellido.toUpperCase()}, ${profesional.profesional.nombre}</option>`
    }

}

function listarHorarios(hora) {

    horarios.innerHTML = ''

    for (let i = 0; i < hora.length; i++) {
        const horario = hora[i];

        horarios.innerHTML += `<div class="m-2 mb-4"><span value="${horario}">${horario}</span></div>`
    }
}

function listarPracticasMedicas(p) {

    for (let i = 0; i < p.length; i++) {
        const practica = p[i]

        practicaMedica.innerHTML += `<option value="${practica.id}">${practica.nombre}</option>`
    }
}