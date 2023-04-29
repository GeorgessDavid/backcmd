window.addEventListener('load', () => {
    let e = document.getElementById('profesionalSelect')

    

    fetch('https://cmedicosdavid.onrender.com/apiUsuarios/profesionales').then(r => {
        return r.json()
    }).then(l => {
        for (let i = 0; i < l.data.length; i++) {
            const p = l.data[i];

            e.innerHTML += `<option value="${p.id}"> ${p.apellido.toUpperCase()}, ${p.nombre} </option>`
        }
    })

    let tableData = document.getElementById('datosTabla')

    fetch('https://cmedicosdavid.onrender.com/turnos/api/listar').then(r => {
        return r.json()
    }).then(g => {
        let spinner = document.getElementById('loadingSpinner')

        spinner.style.visibility = 'hidden';
        spinner.style.opacity = '0';
        spinner.classList.remove('m-5')
        
        for (let i = 0; i < g.data.length; i++) {
            const p = g.data[i];

            tableData.innerHTML += `
            <tr>
                <th scope="row">${p.id}</th>
                <td name="horario">${p.fecha_turno}</td>
                <td name="paciente">${p.paciente.apellido.toUpperCase()}, ${p.paciente.nombre}</td>
                <td name="dni">${p.paciente.dni}</td>
                <td name="obraSocial">${p.paciente.obra_social.nombre}</td>
                <td name="telefono">${p.paciente.telefono}</td>
                <td name="profesional">${p.profesional.apellido.toUpperCase()}, ${p.profesional.nombre}</td>
                <td name="especialidad">${p.profesional.especialidad[0].nombre}</td>
                <td name="tratamiento">${p.practicaMedica === null ? ' ' : p.practicaMedica}</td>
                <td id="present${i}"><input class="form-check-input" type="checkbox"></td>
            </tr>
            `
        }
    })
})