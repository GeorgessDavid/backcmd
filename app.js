/*
let medicos = require("./datos/medicos");

let {agregarMedicos, borrarMedico, buscador} = require("./funciones/functions");



//medicos = agregarMedicos(medicos);
//medicos = borrarMedico(medicos, 41223249);

console.log(buscador())

*/
const express = require('express');

const app = express();

const path = require('path');
/*
const publicPath = path.join(__dirname, '/public');
*/

app.listen(process.env.PORT || 3002, (req, res) => {
    console.log("Servidor activo")
}
);

app.use(express.static(__dirname +'/public'));

app.get('/',(req,res)=>
res.sendFile(path.join(__dirname, '/views/index.html' )));

app.get('/turnos',(req,res)=>
res.sendFile(path.join(__dirname, '/views/turnos.html' )));

app.get('/register',(req,res)=>
res.sendFile(path.join(__dirname, '/views/registro.html' )));

app.get('/login', (req, res) => {

    res.sendFile((__dirname + '/views/login.html'));

})

app.get('/especialidades', (req, res) => {

    res.sendFile((__dirname + '/views/especialidades.html'))
})

/*

app.use(express.static((__dirname + '/public')));

app.get('/', (req,res) => {

    res.sendFile((__dirname + '/views/index.html'));

})

app.get('/login', (req, res) => {

    res.sendFile((__dirname + '/views/login.html'));

})

app.get('/register', (req, res) => {

    res.sendFile((__dirname + '/views/registro.html'));

})

app.get('/turnos', (req, res) => {

    res.sendFile((__dirname + '/views/turnos.html'));

})

app.get('/historiaClinica', (req, res) => {

    res.sendFile((__dirname + '/views/historiaClinica.html'))

})
*/
