window.addEventListener('load', () => {
    let profesional = document.getElementById('profesionalSelect')
    let especialidad = document.getElementById('especialidad')
    let practicaMedica = document.getElementById('practicaMedica')
    let calendar = new Calendar('calendar');

    // LOAD
    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/profesionales').then(r => {
        return r.json()
    }).then(l => {
        for (let i = 0; i < l.data.length; i++) {
            const p = l.data[i].profesional;

            profesional.innerHTML += `<option value="${p.apellido}"> ${p.apellido.toUpperCase()}, ${p.nombre} </option>`
        }


    })

    fetch('https://cmedicosdavid.onrender.com/especialidades/api').then(r => {
        return r.json()
    }).then(l => {
        for (let o = 0; o < l.data.length; o++) {
            const p = l.data[o];

            especialidad.innerHTML += `<option value="${p.nombre}">${p.nombre}</option>`
        }
    })

    fetch('https://cmedicosdavid.onrender.com/tratamientos/api').then(r => {
        return r.json()
    }).then(f => {
        for (let u = 0; u < f.data.length; u++) {
            const t = f.data[u];

            practicaMedica.innerHTML += `<option value="${t.nombre}">${t.nombre}</option>`
        }
    })


    fetch('https://cmedicosdavid.onrender.com/turnos/api/listar').then(r => {
        return r.json()
    }).then(g => {
        let b = g.data

        let spinner = document.getElementById('loadingSpinner')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')

        let today = moment().format('DD [de] MMMM')

        let turno = b.filter(l => {
            return (l.fecha_turno.includes(today))
        })

        listarTurnos(turno)

        calendar.getElement().addEventListener('change', e => {
            let dia = calendar.value().format('DD [de] MMMM')
            let profesionalSelected = profesional.value.trim().toLowerCase()
            let practicaMedicaSelected = practicaMedica.value.trim().toLowerCase()
            let especialdidadSelected = especialidad.value.trim().toLowerCase()
            let o = b.filter(p => {
                if (profesionalSelected != "all") {
                    return (p.profesional.apellido.toLowerCase() === profesionalSelected && p.fecha_turno.includes(dia))
                } else if (practicaMedicaSelected != "all") {
                    return (typeof p.practicaMedica.nombre === 'string' && p.practicaMedica.nombre.toLowerCase() === practicaMedicaSelected && p.fecha_turno.includes(dia));
                } else if (especialdidadSelected != "all") {
                    return (p.profesional.especialidad[0].nombre.trim().toLowerCase() === especialdidadSelected && p.fecha_turno.includes(dia));
                } else {
                    return (p.fecha_turno.includes(dia))
                }
            })

            listarTurnos(o)
        });

        //FILTERS

        profesional.addEventListener('change', e => {
            let profesionalSelected = profesional.value.trim().toLowerCase()

            let listado = b.filter(l => {
                let dia = calendar.value().format('DD [de] MMMM')
                return (l.profesional.apellido.toLowerCase() === profesionalSelected && l.fecha_turno.includes(dia));

            });

            listarTurnos(listado)

            if (profesionalSelected == "all") {
                listarTurnos(turno)
            }
        })

        practicaMedica.addEventListener('change', e => {
            let practicaMedicaSelected = practicaMedica.value.trim().toLowerCase();

            let listado = b.filter(l => {
                let dia = calendar.value().format('DD [de] MMMM');
                return (typeof l.practicaMedica.nombre === 'string' && l.practicaMedica.nombre.toLowerCase() === practicaMedicaSelected && l.fecha_turno.includes(dia));
            });

            listarTurnos(listado);

            if (practicaMedicaSelected === "all") {
                listarTurnos(turno);
            }
        });


        especialidad.addEventListener('change', e => {
            let especialdidadSelected = especialidad.value.trim().toLowerCase()

            let listado = b.filter(l => {
                let dia = calendar.value().format('DD [de] MMMM')
                return (l.profesional.especialidad[0].nombre.trim().toLowerCase() === especialdidadSelected && l.fecha_turno.includes(dia));

            });

            listarTurnos(listado)

            if (especialdidadSelected == "all") {
                listarTurnos(turno)
            }
        })

    })



})

function listarTurnos(paciente) {
    let tableData = document.getElementById('datosTabla')
    let noTurno = document.getElementById('nodate')

    tableData.innerHTML = ''

    for (let i = 0; i < paciente.length; i++) {
        const p = paciente[i];

        tableData.innerHTML += `
        <tr class="${p.presente ? 'table-success' : 'table-light'}">
            <th scope="row">${p.id}</th>
            <td name="fecha">${p.fecha_turno}</td>
            <td name="hora">${p.hora}</td>
            <td name="paciente">${p.paciente.apellido.toUpperCase()}, ${p.paciente.nombre}</td>
            <td name="dni">${p.paciente.dni}</td>
            <td name="obraSocial">${p.paciente.obra_social.nombre}</td>
            <td name="telefono">${p.paciente.telefono}</td>
            <td name="profesional">${p.profesional.apellido.toUpperCase()}, ${p.profesional.nombre}</td>
            <td name="especialidad">${p.profesional.especialidad[0].nombre}</td>
            <td name="tratamiento">${p.practicaMedica.nombre}</td>
            <td id="present${i}"><input class="form-check-input" type="checkbox" ${p.presente ? 'checked disabled' : 'null'}></td>
        </tr>
        `
    }

    if (paciente.length === 0) {
        noTurno.innerHTML = `<span> No hay turnos asignados.</span>`
    } else {
        noTurno.innerHTML = ''
    }
}