const path = require('path')
const db = require('../../database/models');
const moment = require('moment');
const { where } = require('sequelize');

let Hoy = new Date
let fechaDescripcion = moment(Hoy).format('D [de] MMMM [de] YYYY')



const controller = {
    paciente: async (req, res) => {
        let paciente = await db.Usuario.findAll({ where: { alias: req.params.id } })

        db.Diagnostico.findAll({ where: { Paciente_id: paciente[0].id } }).then(datos => {

            let informacion = {
                data_Paciente: paciente[0],
                historia_clinica: datos
            }

            let apiData = {
                data: informacion,
                status: "200"
            }


            return res.json(apiData)
        })
    },
    createHistoria: async (req, res) => {

        console.log('Ejecutando createHistoria')
        let paciente = await db.Usuario.findOne({ where: { alias: req.body.alias } })
        let medico = await db.Usuario.findOne({ where: { id: req.session.usuario.id }, include: [{ association: 'especialidad' }] })
        let historiaClinica = {
            descripcion: fechaDescripcion + '.\n ' + req.body.nuevosDatos + '.\n Firma: ' + medico.apellido.toUpperCase() + ', ' + medico.nombre + ' - ' + medico.especialidad[0].nombre + ' - MN: ' + medico.matricula + '.\n ',
            fecha: Hoy,
            Paciente_id: paciente.id,
            Profesional_id: medico.id,
            Turno_id: null,
            nombre_adjunto: null
        }

        db.Diagnostico.create(historiaClinica).then(result => {

            return res.json({
                "data": result,
                "status": 201,
                "msg": 'Creado correctamente.'
            })
        }).catch(err => {
            return res.json({
                "status": 500,
                "error": err,
                "msg": 'Lo sentimos, hubo un error interno. Intente nuevamente más tarde.'
            })
        })
    },
    updateHistoria: async (req, res) => {

        console.log('Ejecutando updateHistoria')
        let paciente = await db.Usuario.findOne({ where: { alias: req.body.alias } })
        let medico = await db.Usuario.findOne({ where: { id: req.session.usuario.id }, include: [{ association: 'especialidad' }] })

        let oldData = await db.Diagnostico.findOne({ where: { Paciente_id: paciente.id } })
        let previousData = oldData.descripcion


        db.Diagnostico.update({
            descripcion: previousData + fechaDescripcion + '.\n ' + req.body.nuevosDatos + '.\n Firma: ' + medico.apellido.toUpperCase() + ', ' + medico.nombre + ' - ' + medico.especialidad[0].nombre + ' - MN: ' + medico.matricula + '.\n ',
            fecha: Hoy,
            Paciente_id: paciente.id,
            Profesional_id: medico.id,
            Turno_id: null,
            nombre_adjunto: null
        }, { where: { Paciente_id: paciente.id } }).then(result => {
            return res.json({
                "data": result,
                "status": 201,
                "msg": 'Modificado correctamente.'
            })
        }).catch(err => {
            return res.json({
                "status": 500,
                "error": err,
                "msg": 'Lo sentimos, hubo un error interno. Intente nuevamente más tarde.'
            })
        })
    }
}

module.exports = controller