const path = require('path')
const db = require('../../database/models');
const moment = require('moment')
const { Op } = require("sequelize")

const controlador = {

    apiListar: async (req, res) => {
        let turno = await db.Turno.findAll({ include: [{ association: 'paciente', include: [{ association: 'obra_social' }] }, { association: 'profesional', include: [{ association: 'especialidad', order:[['nombre', 'ASC']] }] }, { association: 'practicaMedica' }],
    order:[['fecha_turno', 'ASC']]})

        let data = []
        for (let i = 0; i < turno.length; i++) {
            const e = turno[i]
            moment.locale('es-mx')
            let fechaCreacion = moment(e.fecha_creacion).format('LLLL')
            let horario = moment(e.fecha_turno).format('DD [de] MMMM')
            let fechaCancelacion = moment(e.fecha_cancelacion).format('LLLL')
            let hora = moment(e.fecha_turno).format('HH:mm')

            let turnoToPush = {
                id: e.id,
                Paciente_id: e.Paciente_id,
                Profesional_id: e.Profesional_id,
                fecha_creacion: fechaCreacion == "Fecha inválida" ? " " : fechaCreacion,
                fecha_cancelacion: fechaCancelacion == "Fecha inválida" ? " " : fechaCancelacion,
                fecha_turno: horario,
                hora: hora,
                Tratamiento_id: e.Tratamiento_id,
                presente: e.presente,
                paciente: e.paciente,
                profesional: e.profesional,
                practicaMedica: e.practicaMedica ? e.practicaMedica : {nombre: 'Ninguna'}
            }

            data.push(turnoToPush)

        }

        let info = {
            "total": data.length,
            "data": data,
            "status": 200
        }

        return res.json(info)

    },

    byProfessional: async (req, res) => {

        if (req.session.usuario.alias) {
            let profesional = await db.Usuario.findOne({
                where: {
                    alias: req.session.usuario.alias
                }
            })
            let turno = await db.Turno.findAll({
                where: {
                    Profesional_id: profesional.id
                },
                order: [['fecha_turno', 'ASC']],
                include: [{ association: 'paciente', include: [{ association: 'obra_social' }] }, { association: 'profesional', include: [{ association: 'especialidad' }] }, { association: 'practicaMedica' }]
            })

            let dato = {
                turno: {
                    datosTurno: []
                }
            }

            for (let i = 0; i < turno.length; i++) {
                const e = turno[i]
                moment.locale('es-mx')
                let fechaCreacion = moment(e.fecha_creacion).format('LLLL')
                let horario = moment(e.fecha_turno).format('DD [de] MMMM')
                let fechaCancelacion = moment(e.fecha_cancelacion).format('LLLL')
                let hora = moment(e.fecha_turno).format('HH:mm')

                let turnoToPush = {
                    id: e.id,
                    Paciente_id: e.Paciente_id,
                    Profesional_id: e.Profesional_id,
                    fecha_creacion: fechaCreacion == "Fecha inválida" ? " " : fechaCreacion,
                    fecha_cancelacion: fechaCancelacion == "Fecha inválida" ? " " : fechaCancelacion,
                    fecha_turno: horario,
                    hora: hora,
                    Tratamiento_id: e.Tratamiento_id,
                    presente: e.presente,
                    paciente: e.paciente,
                    profesional: e.profesional,
                    practicaMedica: e.practicaMedica ? e.practicaMedica : 'Ninguna'
                }

                dato.turno.datosTurno.push(turnoToPush)

            }


            let apiData = {
                "data": dato,
                "status": 200,
                "total": dato.length
            }

            return res.json(apiData)
        } else {
            return res.json({ status: "error", "msg": "No autorizado." })
        }
    }
}

module.exports = controlador
