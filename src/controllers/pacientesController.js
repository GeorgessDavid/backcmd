const path = require('path')
const fs = require('fs');
const { validationResult } = require("express-validator");
const pacientesFilePath = path.join(__dirname, '../../datos/pacientes.json');
const pacientes = JSON.parse(fs.readFileSync(pacientesFilePath, 'utf-8'));
const bcrypt = require('bcryptjs');

const db = require('../../database/models');


const controlador = {
    login: (req,res) => {
        if (req.session.usuario) {
            return res.redirect("/")
        }
        else {
            res.render("pacientesLogin")
        }
    },
    loginProcess: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let paciente = pacientes.find(paciente => paciente.usuario == req.body.usuario)
            if (paciente) {
                let password = bcrypt.compareSync(req.body.password, paciente.password)
                if (password) {
                    req.session.usuario = { id: paciente.id, nombre: paciente.nombre, apellido: paciente.apellido, email: paciente.email, usuario: paciente.usuario }
                    req.session.usuarioLogueado = true
                    return res.redirect("/")
                } else {
                    console.log(errors)
                    res.render("pacientesLogin", { errors: { password: {msg: "Contraseña incorrecta"}} } )
                }
            } else {
                res.render("pacientesLogin", { errors: { usuario: {msg: "Usuario inexistente"}} } )
            }
        } else {
            res.render("pacientesLogin", {errors: errors.mapped()})
        }
    },
    logout: (req,res) => {
        req.session.destroy();
        res.redirect("/")
    },
    register: (req,res) => {
        res.render("pacientesRegistro")
    },
    save: (req, res) => {

        let errors = validationResult(req)

        console.log(errors)
        if (errors.isEmpty()) {

            let paciente = {
                alias: req.body.usuario,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                domicilio: req.body.domicilio,
                dni: req.body.dni,
                telefono: req.body.telefono,
                email: req.body.email,
                sexo: true,  //req.body.sexo,
                Rol_id: 4, //req.body.Rol_id,
                Obra_Social_id: 1, //req.body.Obra_Social_id,
                clave: bcrypt.hashSync(req.body.password, 10),
            }

            db.Usuario.create(paciente).then(() => { res.redirect('/') })
        }
        else {
            res.render('pacientesRegistro',{errors: errors.mapped()})
        }

    },
    index: (req,res) => {
        db.Usuario.findAll().then(pacientes => {
            console.log(pacientes)
        })
        res.render("pacientesListado",{ps: pacientes});
    },
    pacientesDetalle: (req,res) => {
        let idPaciente = req.params.id;
        let objPaciente;

        for (let o of pacientes){
            if (idPaciente == o.id){
                objPaciente=o;
                break;
            }
        }
        res.render('pacientesEditar',{paciente: objPaciente});
    },
    pacientesEditar: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty) {
            let id = req.params.id
            for (let i = 0; i < pacientes.length; i++) {
                if (pacientes[i].id == id) {
                    pacientes[i].usuario = req.body.usuario;
                    pacientes[i].nombre = req.body.nombre
                    pacientes[i].apellido = req.body.apellido
                    pacientes[i].email = req.body.email
                    pacientes[i].password = bcrypt.hashSync(req.body.password,10)
                }
            }
    
            fs.writeFileSync(pacientesFilePath,JSON.stringify(pacientes,null," "));
    
            res.redirect('/pacientes');

        }
        else {
            res.render('pacientesEditar',{errors: errors.mapped()})
        }

    },

    delete: (req, res) => {

        let id = req.params.id
        let filteredPacientes = pacientes.filter(paciente => paciente.id != id)

        fs.writeFileSync(pacientesFilePath,JSON.stringify(filteredPacientes,null," "));

        res.redirect('/');
    }
}

module.exports = controlador
