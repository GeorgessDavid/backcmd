const path = require('path')

const controlador = {
    login: (req,res) => {
        res.render("login")
    },
    register: (req,res) => {
        res.render("registro")
    }
}

module.exports = controlador
