const path = require('path')
const fs = require('fs');

const userFilePath = path.join(__dirname, '../../datos/pacientes.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const bcrypt = require('bcryptjs');


const controlador = {
    login: (req,res) => {
        res.render("login")
    },
    register: (req,res) => {
        res.render("registro")
    },
    save: (req, res) => {

        let user = {
            id: users.length,
            usuario: req.body.user,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
        }

        console.log(req.body) // for debugging

        users.push(user);
        fs.writeFileSync(userFilePath,JSON.stringify(users,null," "));

        res.redirect('/');
    },
    vistaEditar: (req,res) => {
        res.render("editar")
    },
    editar: (req,res) => {
        console.log(req.body.email)
    },
    delete: (req, res) => {

        let email = req.body.email

        let filteredUsers = users.filter(user => user.email !== email)

        console.log(filteredUsers)
        fs.writeFileSync(userFilePath,JSON.stringify(filteredUsers,null," "));

        res.redirect('/');
    }
}

module.exports = controlador
