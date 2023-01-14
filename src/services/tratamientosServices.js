const path = require('path')
const db = require('../../database/models');


const controlador = {

    apiListar: (req,res) => {
        db.Tratamiento.findAll({
        }).then((tratamiento) => {
            res.json(tratamiento)
        })
    }
}

module.exports = controlador
