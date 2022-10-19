const path = require('path')
const multer = require('multer');
const userDatabase = require('../../datos/innerDatabase.json')
const session = require('express-session')
const publicMedicos = require("../../datos/publicMedicos.json");
const fs = require("fs");

const prestadoresController = {
    index: (req,res) => {
        res.render("prestadoresLogin")
    },
    home: (req,res) =>{
        res.render('prestadoresViews/prestadoresHome', {ps: publicMedicos})
    },
    login: (req,res) =>{
        req.session.userType = req.body.userType;
        req.session.user = req.body.user;
        req.session.pass = req.body.password;
        req.session.secondPassword = req.body.secondPassword;

        res.redirect("/prestadores/home")
    },
    agregarMedico: (req,res) =>{
        res.render('prestadoresViews/secretariaAgregarMedicoPublico')
    },
    agregarMedicoPublico: (req, res) =>{
        let nuevoMedico = {
            id: "CMD" + Date.now() + "P" ,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            especialidad: [req.body.especialidad, req.body.especialidad2],
            sexo: req.body.sexo,
            estudios: req.body.estudios,
            profileImg: req.file
        };

        publicMedicos.push(nuevoMedico)

        fs.writeFileSync("./datos/publicMedicos.json", JSON.stringify(publicMedicos, null, " "));

        res.redirect("/prestadores/home")
    },
    detallePrestador: (req,res) => {
        let idPrestador = req.params.id;
        let objPrestador;

        for (let o of publicMedicos){
            if (idPrestador == o.id){
                objPrestador=o;
                break;
            }
        }
        res.render('prestadoresViews/editarPrestador',{prestador: objPrestador})
    },
}

module.exports = prestadoresController;