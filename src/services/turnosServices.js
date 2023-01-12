const path = require('path')
const db = require('../../database/models');

const controlador = {

    apiListar: (req,res) => {
        db.Turno.findAll({
        }).then((turnos) => {
            res.json(turnos)
        })
    }

}

module.exports = controlador
