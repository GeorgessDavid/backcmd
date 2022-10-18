const path = require('path')
const multer = require('multer');
const userDatabase = require('../../datos/innerDatabase.json')
const session = require('express-session')

const prestadoresController = {
    index: (req,res) => {
        res.render("prestadoresLogin")
    },
    home: (req,res) =>{
        res.render('prestadoresViews/prestadoresHome')
    },
    login: (req,res) =>{
        req.session.userType = req.body.userType;
        req.session.user = req.body.user;
        req.session.pass = req.body.password;
        req.session.secondPassword = req.body.secondPassword;

        res.redirect("/prestadores/home")
    },
    agregarMedico: (req,res) =>{
        res.render('prestadoresViews/secretariaAgregarMedicoPublico')
    }
}

module.exports = prestadoresController;