const path = require('path')
const db = require('../../database/models');

const controlador = {
    index: (req,res) => {
        res.render("turnos")
    },
    crear: (req,res) => {
        db.Usuario.findAll({
            where: {
                Rol_id: 2
            }
        }).then((profesionales) => {
            res.render("turnosCrear", {profesionales: profesionales})

        })
    },
    store: (req,res) => {
        let turno = {
            fecha_creacion: Date(),
            fecha_turno: req.body.fecha,
            Paciente_id: req.session.usuario.id,
            Profesional_id: req.body.profesional,
            presente: true
        }
        console.log(turno)
        db.Turno.create(turno).then(() => { res.redirect('/') })
    },
    listar: (req,res) => {
        db.Turno.findAll({
            where: {
                Paciente_id: req.session.usuario.id
            }
        }).then((turnos) => {
            res.render("turnosListar", {turnos: turnos})
        })
    }

}

module.exports = controlador
