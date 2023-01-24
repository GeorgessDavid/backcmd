const path = require('path')
const db = require('../../database/models');

const controlador = {
    index: (req,res) => {
        res.render("turnos")
    },
    crear: (req,res) => {
        db.Usuario.findAll({
            where: {
                Rol_id: 3
            }
        }).then((profesionales) => {
            res.render("turnosCrear", {profesionales: profesionales})

        })
    },
    store: (req,res) => {
        let turno = {
            fecha_creacion: new Date(),
            fecha_turno: req.body.fecha,
            Paciente_id: req.session.usuario.id,
            Profesional_id: req.body.profesional,
            presente: false
        }
        console.log(turno)
        db.Turno.create(turno).then(() => { res.redirect('/turnos/listar') })
    },
    delete: (req,res) => {
        db.Turno.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => { res.redirect('/turnos/listar') })
    },
    listar: (req,res) => {
        db.Turno.findAll({
            where: {
                Paciente_id: req.session.usuario.id
            },
            include: [
                {association: "profesional"},
            ]
        }).then((turnos) => {
            console.log(turnos.fecha_turno)
            res.render("turnosListar", {turnos: turnos})

        })
    }

}

module.exports = controlador
