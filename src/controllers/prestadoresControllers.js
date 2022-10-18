const path = require('path')
const multer = require('multer');


const prestadoresController = {
    index: (req,res) => {
        res.render("prestadoresLogin")
    },
    home: (req,res) =>{
        res.render('prestadoresViews/prestadoresHome')
    },
    login: (req,res) =>{
        res.redirect("/prestadores/home")
    },
    agregarMedico: (req,res) =>{
        res.render('prestadoresViews/secretariaAgregarMedicoPublico')
    }
}

module.exports = prestadoresController;