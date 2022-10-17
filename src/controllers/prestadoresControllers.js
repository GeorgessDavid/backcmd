const path = require('path')

const prestadoresController = {
    index: (req,res) => {
        res.render("prestadoresLogin")
    },
    home: (req,res) =>{
        res.render('./prestadoresViews/prestadoresHome')
    },
    login: (req,res) =>{
        res.redirect("/prestadores/home")
    }
}

module.exports = prestadoresController;