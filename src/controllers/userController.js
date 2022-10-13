const path = require('path')
const fs = require('fs');

const userFilePath = path.join(__dirname, '../../datos/pacientes.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const controlador = {
    login: (req,res) => {
        res.render("login")
    },
    register: (req,res) => {
        res.render("registro")
    },
    save: (req, res) => {

        let user = {
            usuario: req.body.user,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
        }

        console.log(req.body)

        users.push(user);
        fs.writeFileSync(userFilePath,JSON.stringify(users,null," "));

        res.redirect('/');
    },
}

module.exports = controlador
