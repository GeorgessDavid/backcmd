window.addEventListener('load', () => {
    let tabla = document.getElementById('table')

    fetch('http://localhost:3005/turnos/api/profesional/').then(r => {
        return r.json()
    }).then(f => {
        let spinner = document.getElementById('loadingSpinner')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')

        let t = f.data.turno.datosTurno
        console.log(t)

        
        let today = moment().format('DD [de] MMMM')

        let turno = t.filter(l => {
            return (l.fecha_turno.includes(today))
        })

        turnosDelDia(turno)

        let calendar = new Calendar('calendar');
        calendar.getElement().addEventListener('change', e => {
            let dia = calendar.value().format('DD [de] MMMM')
            let o = t.filter(p => {
                return (p.fecha_turno.includes(dia))
            })

            turnosDelDia(o)
        });

    })
})

function turnosDelDia(paciente) {
    let tabla = document.getElementById('table')

    tabla.innerHTML = ''

    for (let i = 0; i < paciente.length; i++) {
        const r = paciente[i];

        tabla.innerHTML += `
    <tr>
        <th scope="row">${r.id}</th>
        <td>${r.paciente.nombre}</td>
        <td>${r.paciente.apellido}</td>
        <td>${r.fecha_turno}</td>
        <td>${r.hora}</td>
        <td>${r.paciente.dni}</td>
        <td>${r.paciente.sexo ? 'Masculino' : 'Femenino'}</td>
        <td>${r.practicaMedica}</td>
        <td>${r.presente ? 'Sí' : 'No'}</td>
        <td><button class="btn btn-primary"><a href="/prestadores/profesional/pacientes/historiaClinica/${r.paciente.id}" target="__blank">Abrir Historia Clínica <i class="fa-solid fa-arrow-up-right-from-square"></i></a></button></td>
    </tr>`
    }
}