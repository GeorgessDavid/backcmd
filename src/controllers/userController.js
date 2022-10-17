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
        let id = users[users.length-1].id + 1;
        let user = {
            id: id,
            usuario: req.body.usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
        }

        users.push(user);
        fs.writeFileSync(userFilePath,JSON.stringify(users,null," "));

        res.redirect('/');
    },
    index: (req,res) => {
        res.render("pacientes",{ps: users});
    },
    detalleUser: (req,res) => {
        let idUser = req.params.id;
        let objUser;

        for (let o of users){
            if (idUser == o.id){
                objUser=o;
                break;
            }
        }
        res.render('editarUser',{paciente: objUser})
    },
    editarUser: (req,res) => {
        let id = req.params.id
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == id) {
                users[i].usuario = req.body.usuario;
                users[i].nombre = req.body.nombre
                users[i].apellido = req.body.apellido
                users[i].email = req.body.email
                users[i].password = req.body.password
            }
        }

        fs.writeFileSync(userFilePath,JSON.stringify(users,null," "));

        res.redirect('/users');
    },

    delete: (req, res) => {

        let id = req.params.id
        let filteredUsers = users.filter(user => user.id != id)
        console.log(id)
        fs.writeFileSync(userFilePath,JSON.stringify(filteredUsers,null," "));

        res.redirect('/');
    }
}

module.exports = controlador
