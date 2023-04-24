const path = require('path')
const db = require('../../database/models');

const controller = {
    paciente: async (req, res) => {
        let paciente = await db.Usuario.findAll({where: {alias: req.params.id}})
        
        db.Diagnostico.findAll({where: {Paciente_id: paciente[0].id}}).then( datos => {
            
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
    }
}

module.exports = controller