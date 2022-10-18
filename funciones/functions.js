let fs = require('fs');
var rl = require('readline-sync');
// const { documento, nombre, apellido, sexo, matricula, especialidad, nacimiento } = require('../datos/userMainData');
let {buscarPorEspecialidad, buscarPorMatricula, buscarPorDocumento, buscarPorApellido,buscarPorNombre} = require('./buscador/buscador.js')


function agregarMedicos(medicos){

    let documento = rl.question("Documento: ")

    let nuevoMedico = {       
        nombre: rl.question("Nombre: "),
        apellido: rl.question("Apellido: "),
        documento: parseInt(documento),
        sexo: rl.question("Sexo: "), 
        matricula: rl.question("Matricula: "),
        especialidad: rl.question("Especialidad: "),
        nacimiento: rl.question("Fecha de Nacimiento (DD de Mes de AAAA): "),
        userID: "CMD" + documento + "N2022"
        };

    medicos.push(nuevoMedico)
    
    fs.writeFileSync("./datos/medicos.json", JSON.stringify(medicos, null, " "));

}

function agregarMedicosPublicos(){

    let nuevoMedico = {       
        nombre: req.body.name,
        apellido: req.body.apellido,
        especialidad: [req.body.especialidad, req.body.especialidad2],
        sexo: req.body.sexo,
        estudios: req.body.estudios
        };

    medicos.push(nuevoMedico)
    
    fs.writeFileSync("./datos/publicMedicos.json", JSON.stringify(medicos, null, " "));

}




function borrarMedico(medicos, documentoMedico){

    let medicosActualizado = medicos.filter(function(numero){
        
        return numero.documento != documentoMedico;

    })
    
    fs.writeFileSync("./datos/medicos.json", JSON.stringify(medicosActualizado, null, " "));

    return medicosActualizado;
}


function buscador(){

    let seleccionarBuscador = rl.question("Seleccione buscador ==> [ 1 - Buscar por Nombre] // [ 2 - Buscar por Apellido] // [ 3 - Buscar por Documento] // [ 4 - Buscar por Matricula] // [5 - Buscar por Especialidad]: ");

    if(seleccionarBuscador == '1'){

        return buscarPorNombre()

    } else if (seleccionarBuscador == '2'){

        return buscarPorApellido()

    } else if (seleccionarBuscador == '3'){

        return buscarPorDocumento()

    } else if (seleccionarBuscador == '4'){

        return buscarPorMatricula()

    } else if (seleccionarBuscador == '5'){

        return buscarPorEspecialidad()
    
    } else {

        return "Opción no encontrada o respuesta no válida. Verifique las opciones disponibles y vuelva a intentarlo."
    }



}

//console.log(buscador())


module.exports = {agregarMedicos, borrarMedico, buscador, agregarMedicosPublicos};