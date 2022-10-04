const path = require('path')

const controlador = {
    index: (req,res) => {
        res.render("turnos")
    },
}

module.exports = controlador
