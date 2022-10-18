const path = require('path')

const controlador = {
    index: (req,res) => {
        res.render("especialidades")
    },
}

module.exports = controlador
