const path = require('path')
const db = require('../../database/models')

const controlador = {
    index: (req, res) => {
        res.render("especialidades")
    },

    getEspecialidades: async (req, res) => {
        try {
            let especialidades = await db.Especialidad.findAll()

            let data = {
                "data": especialidades,
                "status": 200
            }

            return res.json(data)
        } catch (err) {
            console.log(err)
            res.render(err)
        }
    },

    delete: (req, res) => {
        db.Especialidad.destroy({ where: { id: req.params.id } }).then(() => {
            return res.redirect('/prestadores/especialidades')
        }).catch(err => {
            console.log(err)
            res.render(err)
        })
    },

    update: (req, res) => {
        
        db.Especialidad.update({nombre: req.body.especialidadNombre},{where: {
            id: req.params.id
        }}).then((resultados) => {
            console.log(resultados)
            return res.redirect('/prestadores/especialidades')
        }).catch(err => {
            console.log(err)
            res.render(err)
        })
    }
}

module.exports = controlador
