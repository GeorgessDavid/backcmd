const path = require('path')
const db = require('../../database/models');
const moment = require('moment')
const { Op } = require("sequelize")

const controlador = {

    apiListar: async (req, res) => {
        let turno = await db.Turno.findAll({ include: [{ association: 'paciente', include: [{ association: 'obra_social' }] }, { association: 'profesional', include: [{ association: 'especialidad' }] }, { association: 'practicaMedica' }] })

        let data = []
        for (let i = 0; i < turno.length; i++) {
            const e = turno[i]
            moment.locale('es-mx')
            let fechaCreacion = moment(e.fecha_creacion).format('LLLL')
            let horario = moment(e.fecha_turno).format('LLLL')
            let fechaCancelacion = moment(e.fecha_cancelacion).format('LLLL')


            console.log(e.fecha_creacion)
            console.log(e.fecha_cancelacion)
            let turnoToPush = {
                id: e.id,
                Paciente_id: e.Paciente_id,
                Profesional_id: e.Profesional_id,
                fecha_creacion: fechaCreacion == "Fecha inválida" ? " " : fechaCreacion,
                fecha_cancelacion: fechaCancelacion == "Fecha inválida" ? " " : fechaCancelacion,
                fecha_turno: horario,
                Tratamiento_id: e.Tratamiento_id,
                presente: e.presente,
                paciente: e.paciente,
                profesional: e.profesional,
                practicaMedica: e.practicaMedica
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

    currentDay: async (req, res) => {
        let turno = await db.Turno.findAll({
            where: {
                fecha_turno: {
                    [Op.between]: [
                        moment()
                            .startOf('day')
                            .format(),
                        moment()
                            .endOf('day')
                            .format()
                    ]
                }
            }, include: [{ association: 'paciente', include: [{ association: 'obra_social' }] }, { association: 'profesional', include: [{ association: 'especialidad' }] }, { association: 'practicaMedica' }]
        })

        let data = []
        for (let i = 0; i < turno.length; i++) {
            const e = turno[i]
            moment.locale('es-mx')
            let fechaCreacion = moment(e.fecha_creacion).format('LLLL')
            let horario = moment(e.fecha_turno).format('LLLL')
            let fechaCancelacion = moment(e.fecha_cancelacion).format('LLLL')

            let turnoToPush = {
                id: e.id,
                Paciente_id: e.Paciente_id,
                Profesional_id: e.Profesional_id,
                fecha_creacion: fechaCreacion == "Fecha inválida" ? " " : fechaCreacion,
                fecha_cancelacion: fechaCancelacion == "Fecha inválida" ? " " : fechaCancelacion,
                fecha_turno: horario,
                Tratamiento_id: e.Tratamiento_id,
                presente: e.presente,
                paciente: e.paciente,
                profesional: e.profesional,
                practicaMedica: e.practicaMedica
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
        let profesional = await db.Usuario.findAll({
            where: {
                alias: req.session.alias
            }
        })

        let turno = await db.Turno.findAll({
            where: {
                fecha_turno: {
                    [Op.between]: [
                        moment()
                            .startOf('day')
                            .format(),
                        moment()
                            .endOf('year')
                            .format()
                    ]
                },
                Profesional_id: profesional[0].id
            }, include: [{ association: 'paciente', include: [{ association: 'obra_social' }] }, { association: 'profesional', include: [{ association: 'especialidad' }] }, { association: 'practicaMedica' }]
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
            let horario = moment(e.fecha_turno).format('LLLL')
            let fechaCancelacion = moment(e.fecha_cancelacion).format('LLLL')

            let turnoToPush = {
                id: e.id,
                Paciente_id: e.Paciente_id,
                Profesional_id: e.Profesional_id,
                fecha_creacion: fechaCreacion == "Fecha inválida" ? " " : fechaCreacion,
                fecha_cancelacion: fechaCancelacion == "Fecha inválida" ? " " : fechaCancelacion,
                fecha_turno: horario,
                Tratamiento_id: e.Tratamiento_id,
                presente: e.presente,
                paciente: e.paciente,
                profesional: e.profesional,
                practicaMedica: e.practicaMedica
            }

            dato.turno.datosTurno.push(turnoToPush)

        }

        console.log(turno)

        let apiData = {
            "data": dato,
            "status": 200,
            "total": dato.length
        }

        return res.json(apiData)
    }
}

module.exports = controlador
