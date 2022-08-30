var rl = require('readline-sync');

let documento = rl.question("Documento: ");

let nombre = rl.question("Nombre(s): ");

let apellido = rl.question("Apellido(s): ");

let sexo = rl.question("Sexo: ");

let matricula = rl.question("Matricula: ");

let especialidad = [rl.question("Especialidad: ")];

let nacimiento = rl.question("Nacimiento (DD de Mes del AAAA): ");

module.exports = {documento, nombre, apellido, sexo, matricula, especialidad, nacimiento};
