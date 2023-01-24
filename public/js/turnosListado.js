var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours()
var mm = today.getMinutes()

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;


window.addEventListener('load', () => {
    let e = document.getElementById('profesionalSelect')
    
    document.getElementById("calendary").setAttribute("min", today)

    fetch('http://localhost:3005/apiUsuarios/profesionales').then(r => {
        return r.json()
    }).then(l => {
        for (let i = 0; i < l.data.length; i++) {
            const p = l.data[i];
            
            e.innerHTML += `<option value="${p.id}"> ${p.apellido.toUpperCase()}, ${p.nombre} </option>`
        }
    })

    let tableData = document.getElementById('datosTabla')

    fetch('http://localhost:3005/turnos/api/listar').then(r => {
        return r.json()
    }).then(g => {
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