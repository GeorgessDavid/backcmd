const fs = require("fs");
const path = require('path')
const multer = require('multer');
const userDatabase = require('../../datos/innerDatabase.json')
const session = require('express-session')
const prestadoresFilePath = path.join(__dirname, '../../datos/publicMedicos.json')
const publicMedicos = JSON.parse(fs.readFileSync(prestadoresFilePath, 'utf-8'))
const licenciaturas = ["Psicología", "Nutrición", "Kinesiología", "Psicopedagogía"];


const prestadoresController = {
    index: (req, res) => {
        res.render("prestadoresLogin")
    },
    home: (req, res) => {
        res.render('prestadoresViews/prestadoresHome', { ps: publicMedicos })
    },
    login: (req, res) => {
        req.session.userType = req.body.userType;
        req.session.user = req.body.user;
        req.session.pass = req.body.password;
        req.session.secondPassword = req.body.secondPassword;

        res.redirect("/prestadores/home")
    },
    agregarMedico: (req, res) => {
        res.render('prestadoresViews/secretariaAgregarMedicoPublico')
    },
    agregarMedicoPublico: (req, res) => {
        if (req.file) {
            let nuevoMedico = {
                id: "CMD" + Date.now() + "P",
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                especialidad: req.body.especialidad,
                especialidad2: req.body.especialidad2,
                sexo: req.body.sexo,
                estudios: req.body.estudios,
                profileImg: req.file.filename
            };
            publicMedicos.push(nuevoMedico)
        } else {
            let nuevoMedico = {
                id: "CMD" + Date.now() + "P",
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                especialidad: req.body.especialidad,
                especialidad2: req.body.especialidad2,
                sexo: req.body.sexo,
                estudios: req.body.estudios,
                profileImg: "default_profile_img.png"
            }
            publicMedicos.push(nuevoMedico)
        }    
        
        fs.writeFileSync("./datos/publicMedicos.json", JSON.stringify(publicMedicos, null, " "));

        res.redirect("/prestadores/home")
    },
    editandoPrestador: (req, res) => {
        let idPrestador = req.params.id;
        let objPrestador;

        for (let o of publicMedicos) {
            if (idPrestador == o.id) {
                objPrestador = o;
                break;
            }
        }
        res.render('prestadoresViews/editarPrestador', { prestador: objPrestador })
    },
    
    confirmarEliminacion: (req, res) =>{
        let idPrestador = req.params.id;
        let objPrestador;
        
        for (let o of publicMedicos) {
            if (idPrestador == o.id) {
                objPrestador = o;
                break;
            }
        }

        res.render('prestadoresViews/confirmDelete', {prestador: objPrestador})
    },

    deletePrestador: (req, res) => {

        let id = req.params.id
        let filteredPrestadores = publicMedicos.filter(prestador => prestador.id != id)

        fs.writeFileSync(prestadoresFilePath,JSON.stringify(filteredPrestadores,null," "));

        res.redirect('/prestadores/eliminacionConfirmada');
    },
    
    eliminacionConfirmada: (req, res) =>{
        res.render('prestadoresViews/eliminacionConfirmada')
    },

    editarPrestador: (req,res) =>{
        let id = req.params.id
        for (let i = 0; i < publicMedicos.length; i++) {
            if (publicMedicos[i].id == id) {
                publicMedicos[i].nombre = req.body.nombre;
                publicMedicos[i].apellido = req.body.apellido
                publicMedicos[i].especialidad = req.body.especialidad
                publicMedicos[i].especialidad2 = req.body.especialidad2
                publicMedicos[i].sexo = req.body.sexo
                publicMedicos[i].estudios = req.body.estudios
                if(req.file){
                    publicMedicos[i].profileImg = req.file.filename
                }else{
                    publicMedicos[i].profileImg = "default_profile_img.png"
                }
            }
        }

        fs.writeFileSync(prestadoresFilePath,JSON.stringify(publicMedicos,null," "));

        res.redirect('/prestadores/home');
    }
}

module.exports = prestadoresController;