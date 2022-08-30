var rl = require('readline-sync');
let medicos = require('../../datos/medicos.json');
//let {documento, nombre, apellido, sexo, matricula, especialidad, nacimiento} = require('../../datos/userMainData.js');
var notFound = "Médico no encontrado."

function buscarPorNombre(){

    let nombre = rl.question("Nombre(s): ");

    let medicoNombre = medicos.filter(function(elemento){

        return elemento.nombre == nombre;
    })

    if(medicoNombre.length > 0){
    
    return medicoNombre;

    }else{

        return notFound;
    }

}

//console.log(buscarPorNombre())



function buscarPorApellido(){

    let apellido = rl.question("Apellido(s): ");

    let medicoApellido = medicos.filter(function(elemento){
        
        return elemento.apellido == apellido;
    })

    if(medicoApellido.length > 0){

        return medicoApellido; 

    }else{

    return notFound;
    
    }
    
}

//console.log(buscarPorApellido())

function buscarPorDocumento(){

    let documento = rl.question("Documento: ");

    let medicoDocumento = medicos.filter(function(elemento){

        return elemento.documento == documento;

    })
    
    if(medicoDocumento.length > 0){

        return medicoDocumento;
    
    } else {

        return notFound;

    }

}

//console.log(buscarPorDocumento())

function buscarPorMatricula(){

    let matricula = rl.question("Matricula: ");

    let matriculaMedico = medicos.filter(function(elemento){

        return elemento.matricula == matricula;

    })

    if (matriculaMedico.length > 0){

        return matriculaMedico;

    } else {

        return notFound
    }
}

//console.log(buscarPorMatricula());

function buscarPorEspecialidad(){

    let especialidad = [rl.question("Especialidad: ")];

    let especialidadMedico = medicos.filter(function(elemento){

        return elemento.especialidad == especialidad;

    })

    if (especialidadMedico.length > 0){

        return especialidadMedico;

    } else {
        
        return notFound;
    
    }
}

//console.log(buscarPorEspecialidad())

module.exports = {buscarPorEspecialidad, buscarPorMatricula, buscarPorDocumento, buscarPorApellido,buscarPorNombre};