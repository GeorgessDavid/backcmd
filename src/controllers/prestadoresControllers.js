/* REQUIRES */
const fs = require("fs");
const path = require('path')
const multer = require('multer');
const userDatabase = require('../../datos/innerDatabase.json')
const session = require('express-session');
const { validationResult } = require("express-validator");
const prestadoresFilePath = path.join(__dirname, '../../datos/publicMedicos.json')
const publicMedicos = JSON.parse(fs.readFileSync(prestadoresFilePath, 'utf-8'))
const innerDatabase = path.join(__dirname, '../../datos/innerDatabase.json')
const prestadoresUsers = JSON.parse(fs.readFileSync(innerDatabase, 'utf-8'))
const bcrypt = require('bcryptjs')
const db = require('../../database/models')

const user = {
    findByField: (field, text) => {
        let usuario = prestadoresUsers;
        let userFound = usuario.find(oneUser => oneUser[field] === text);
        return userFound;
    }
}
/* CONTROLLER */
const prestadoresController = {
    index: (req, res) => {
        return res.render("prestadoresLogin")
    },
    users: (req, res) => {
        return res.render('prestadoresViews/administradorViews/usuarios_admin')
    },
    home: (req, res) => {

            return res.render('prestadoresViews/prestadoresHome')
        
        // return res.render('prestadoresViews/prestadoresHome', { ps: publicMedicos })
    },
    login: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let userToLogin = user.findByField('user' === req.body.user)

            console.log(userToLogin)

            if (userToLogin) {
                let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)

                if ((isOkThePassword === true && (req.body.secondPassword == userToLogin.secondPassword)) || ((req.body.userType === "administrador") && (req.body.user === "administrador") && (req.body.password === "admin") && (req.body.secondPassword === "admin"))) {

                    req.session.userLogged = userToLogin

                    if (req.body.recordarme) {
                        res.cookie('rememberMe', userToLogin, { maxAge: 1000 * 60 * 60 * 24 * 360 })
                    }

                    return res.redirect("/prestadores/admin/home");


                } else {
                    let loginError = "Usuario, clave o tipo de usuario incorrectos."
                    return res.render('prestadoresLogin', { errors: errors.mapped(), loginProcess: loginError })
                }
            }
        } else {
            return res.render('prestadoresLogin', { errors: errors.mapped() })
        }
    },
    agregarMedico: async (req, res) => {

        db.Especialidad.findAll().then((especialidad) => {
            let especialidades = [];

            for (let x of especialidad) {
                let especialidadEncontrada = {
                    id: x.id,
                    nombre: x.nombre
                }

                especialidades.push(especialidadEncontrada)
            }


            res.render('prestadoresViews/agregarUsuario', { especialidades: especialidades })
        })

    },
    agregarMedicoPublico: async (req, res) => {
        let errors = validationResult(req);

        let especialidad = await db.Especialidad.findAll();

        if (errors.isEmpty()) {

            let aliasExistente = await db.Usuario.findOne({ where: { alias: req.body.alias } })

            let emailExistente = await db.Usuario.findOne({ where: { email: req.body.email } })

            if (!aliasExistente) {
                if (!emailExistente) {
                    if (req.file) {
                        if (req.body.userType != 3) {
                            db.Usuario.create({
                                Rol_id: req.body.userType,
                                alias: req.body.alias,
                                clave: bcrypt.hashSync(req.body.password, 10),
                                nombre: req.body.nombre,
                                apellido: req.body.apellido,
                                email: req.body.email,
                                dni: req.body.dni,
                                telefono: req.body.telefono,
                                domicilio: req.body.domicilio,
                                sexo: req.body.sexo,
                                nacimiento: req.body.nacimiento,
                                matricula: null,
                                Obra_Social_id: null,
                                imagen: req.file.filename
                            }).then((resultados) => {
                                console.log("Usuario agregado: " + resultados)
                                return res.redirect("/prestadores/admin/home")
                            })
                        } else {
                            db.Usuario.create({
                                Rol_id: req.body.userType,
                                alias: req.body.alias,
                                clave: bcrypt.hashSync(req.body.password, 10),
                                nombre: req.body.nombre,
                                apellido: req.body.apellido,
                                email: req.body.email,
                                dni: req.body.dni,
                                telefono: req.body.telefono,
                                domicilio: req.body.domicilio,
                                sexo: req.body.sexo,
                                nacimiento: req.body.nacimiento,
                                matricula: req.body.matricula,
                                Obra_Social_id: null,
                                imagen: req.file.filename
                            }).then((profesional) => {
                                db.Usuario.findOne({ where: { alias: req.body.alias } })

                                db.Profesional_Especialidad.create({
                                    Profesional_id: profesional.id,
                                    Especialidad_id: req.body.especialidad
                                }).then(() => {
                                    return res.redirect("/prestadores/admin/home")
                                })
                            })
                        }
                    } else {
                        if (req.body.userType != 3) {
                            db.Usuario.create({
                                Rol_id: req.body.userType,
                                alias: req.body.alias,
                                clave: bcrypt.hashSync(req.body.password, 10),
                                nombre: req.body.nombre,
                                apellido: req.body.apellido,
                                email: req.body.email,
                                dni: req.body.dni,
                                telefono: req.body.telefono,
                                domicilio: req.body.domicilio,
                                sexo: req.body.sexo,
                                nacimiento: req.body.nacimiento,
                                matricula: null,
                                Obra_Social_id: null,
                                imagen: "default_profile_img.png"
                            }).then((resultados) => {
                                console.log("Usuario agregado: " + resultados)
                                return res.redirect("/prestadores/admin/home")
                            })
                        } else {
                            console.log(req.body.especialidad)

                            db.Usuario.create({
                                Rol_id: req.body.userType,
                                alias: req.body.alias,
                                clave: bcrypt.hashSync(req.body.password, 10),
                                nombre: req.body.nombre,
                                apellido: req.body.apellido,
                                email: req.body.email,
                                dni: req.body.dni,
                                telefono: req.body.telefono,
                                domicilio: req.body.domicilio,
                                sexo: req.body.sexo,
                                nacimiento: req.body.nacimiento,
                                matricula: req.body.matricula,
                                Obra_Social_id: null,
                                imagen: "default_profile_img.png"
                            }).then((profesional) => {
                                db.Usuario.findOne({ where: { alias: req.body.alias } })

                                db.Profesional_Especialidad.create({
                                    Profesional_id: profesional.id,
                                    Especialidad_id: req.body.especialidad
                                }).then(() => {
                                    return res.redirect("/prestadores/admin/home")
                                })
                            })
                        }
                    }
                } else {

                    return res.render('prestadoresViews/agregarUsuario', { errors: { email: { msg: "Este email ya está en uso." } }, especialidades: especialidad })
                }
            } else {

                return res.render('prestadoresViews/agregarUsuario', { errors: { alias: { msg: "Este nombre de usuario ya está en uso." } }, especialidades: especialidad })
            }
        } else {

            return res.render('prestadoresViews/agregarUsuario', { errors: errors.mapped(), especialidades: especialidad })

        }
    },
    editarMedicoPublico: (req, res) => { // comienzo edicion Mariela
        let errors = validationResult(req);
        console.log(errors)

        if (errors.isEmpty()) {
            if (req.file) {
                let nuevoMedico = {
                    id: "CMD" + Date.now() + "P",
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    especialidad: req.body.especialidad,
                    especialidad2: req.body.especialidad2,
                    sexo: req.body.sexo,
                    estudios: req.body.estudios,
                    profileImg: req.file.filename
                };
                publicMedicos.push(nuevoMedico)
            } else {
                let nuevoMedico = {
                    id: "CMD" + Date.now() + "P",
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    especialidad: req.body.especialidad,
                    especialidad2: req.body.especialidad2,
                    sexo: req.body.sexo,
                    estudios: req.body.estudios,
                    profileImg: "default_profile_img.png"
                }
                publicMedicos.push(nuevoMedico)
            }

            fs.writeFileSync("./datos/publicMedicos.json", JSON.stringify(publicMedicos, null, " "));

            res.redirect("/prestadores/admin/home")

        } else {
            res.render('prestadoresViews/editarPrestador/:id', { errors: errors.mapped() })
        }
    },
    editandoPrestador: async (req, res) => {

        let usuario = await db.Usuario.findByPk(req.params.id)

        console.log(usuario)
        
        res.render('prestadoresViews/editarPrestador', { prestador: usuario })
    },

    confirmarEliminacion: (req, res) => {
        let idPrestador = req.params.id;
        let objPrestador;

        for (let o of publicMedicos) {
            if (idPrestador == o.id) {
                objPrestador = o;
                break;
            }
        }

        res.render('prestadoresViews/confirmDelete', { prestador: objPrestador })
    },

    deletePrestador: (req, res) => {

        let id = req.params.id
        db.Usuario.destroy({where: {id: id}}).then(() => {
            return  res.redirect('/prestadores/eliminacionConfirmada');
        })
    },

    eliminacionConfirmada: (req, res) => {
        res.render('prestadoresViews/eliminacionConfirmada')
    },

    editarPrestador: (req, res) => {
        let id = req.params.id
        for (let i = 0; i < publicMedicos.length; i++) {
            if (publicMedicos[i].id == id) {
                publicMedicos[i].nombre = req.body.nombre;
                publicMedicos[i].apellido = req.body.apellido
                publicMedicos[i].especialidad = req.body.especialidad
                publicMedicos[i].especialidad2 = req.body.especialidad2
                publicMedicos[i].sexo = req.body.sexo
                publicMedicos[i].estudios = req.body.estudios
                if (req.file) {
                    publicMedicos[i].profileImg = req.file.filename
                } else {
                    publicMedicos[i].profileImg = "default_profile_img.png"
                }
            }
        }

        fs.writeFileSync(prestadoresFilePath, JSON.stringify(publicMedicos, null, " "));

        res.redirect('/prestadores/admin/home');
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('rememberMe');
        return res.redirect("/pacientes/login")

    },

    especialidades: (req, res) => {

        db.Especialidad.findAll().then((data) => {

            let datos = [];

            for (let especialidad of data) {
                let datosPush = {
                    id: especialidad.id,
                    nombre: especialidad.nombre
                }

                datos.push(datosPush);
            }
            console.log(datos)
            res.render('prestadoresViews/especialidades_admin', { especialidades: datos })
        })

    },

    agregarEspecialidad: (req, res) => {
        res.render('prestadoresViews/agregarEspecialidad')
    },

    agregarEspecialidadSubmit: (req, res) => {
        let errors = validationResult(req);
        console.log(errors)
        if (errors.isEmpty()) {
            db.Especialidad.create({
                nombre: req.body.especialidadNombre
            }).then((result) => {
                res.redirect('/prestadores/especialidades')
                console.log(result)
            })
        } else {
            return res.render('prestadoresViews/agregarEspecialidad', { errors: errors.mapped() })
        }
    },

    practicasMedicas: (req, res) => {
        return res.render('prestadoresViews/administradorViews/practicasMedicas_admin')
    }
}

module.exports = prestadoresController;