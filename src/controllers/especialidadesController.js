const path = require('path')
const db = require('../../database/models')

const controlador = {
    index: (req,res) => {
        res.render("especialidades")
    },

    getEspecialidades: async (req, res) => {
        
        try{let especialidades = await db.Especialidad.findAll()
            return res.json(especialidades)
        } catch(err){
            console.log(err)
            res.render(err)
        }
    }
}

module.exports = controlador
