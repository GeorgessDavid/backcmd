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
const db = require('../../database/models');
const { response } = require("express");

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
    addUserPost: async (req, res) => {
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
                                matricula: "MN" + req.body.matricula,
                                Obra_Social_id: null,
                                imagen: req.file.filename
                            }).then((profesional) => {
                                db.Usuario.findOne({ where: { alias: req.body.alias } })

                                let profEspecialidad = {
                                    Profesional_id: profesional.id,
                                    Especialidad_id: req.body.especialidad
                                }

                                let profTratamiento = {
                                    Profesional_id: profesional.id,
                                    Tratamiento_id: req.body.practicaMedica
                                }

                                db.Profesional_Especialidad.create(profEspecialidad).then(() => {
                                    for (let x of profTratamiento.Tratamiento_id) {

                                        profTratamiento.Tratamiento_id = x

                                        db.Profesional_Tratamiento.create(profTratamiento).then(() => {
                                            console.log("Creado")
                                        })
                                    }
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
                                matricula: "MN" + req.body.matricula,
                                Obra_Social_id: null,
                                imagen: "default_profile_img.png"
                            }).then((profesional) => {
                                db.Usuario.findOne({ where: { alias: req.body.alias } })

                                let profEspecialidad = {
                                    Profesional_id: profesional.id,
                                    Especialidad_id: req.body.especialidad
                                }

                                let profTratamiento = {
                                    Profesional_id: profesional.id,
                                    Tratamiento_id: req.body.practicaMedica
                                }

                                db.Profesional_Especialidad.create(profEspecialidad).then(() => {
                                    for (let x of profTratamiento.Tratamiento_id) {

                                        profTratamiento.Tratamiento_id = x

                                        db.Profesional_Tratamiento.create(profTratamiento).then(() => {
                                            console.log("Creado")
                                        })
                                    }
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
    editarUsuario: (req, res) => { // comienzo edicion Mariela
        let errors = validationResult(req);
        console.log(errors)

        let userToEdit = []

        if (errors.isEmpty()) {
            if (req.file) {
                if (req.body.userType != 3) {
                    let o = {
                        alias: req.body.alias,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        dni: req.body.dni,
                        email: req.body.email,
                        matricula: null,
                        sexo: req.body.sexo,
                        domicilio: req.body.domicilio,
                        telerfono: req.body.telefono,
                        imagen: req.file.filename,
                        nacimiento: req.body.nacimiento,
                        Obra_Social_id: null,
                        Rol_id: req.body.userType,
                        especialidad: null
                    }

                    userToEdit.push(o)
                } else {
                    let o = {
                        alias: req.body.alias,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        dni: req.body.dni,
                        email: req.body.email,
                        matricula: "MN" + req.body.matricula,
                        sexo: req.body.sexo,
                        domicilio: req.body.domicilio,
                        telerfono: req.body.telefono,
                        imagen: req.file.filename,
                        nacimiento: req.body.nacimiento,
                        Obra_Social_id: null,
                        Rol_id: req.body.userType,
                        especialidad: [{
                            id: req.body.especialidad
                        }]
                    }

                    userToEdit.push(o)
                }
            } else {
                if (req.body.userType != 3) {
                    let o = {
                        alias: req.body.alias,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        dni: req.body.dni,
                        email: req.body.email,
                        matricula: null,
                        sexo: req.body.sexo,
                        domicilio: req.body.domicilio,
                        telerfono: req.body.telefono,
                        imagen: "default_profile_img.png",
                        nacimiento: req.body.nacimiento,
                        Obra_Social_id: null,
                        Rol_id: req.body.userType,
                        especialidad: null
                    }

                    userToEdit.push(o)
                } else {
                    let o = {
                        alias: req.body.alias,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        dni: req.body.dni,
                        email: req.body.email,
                        matricula: "MN" + req.body.matricula,
                        sexo: req.body.sexo,
                        domicilio: req.body.domicilio,
                        telerfono: req.body.telefono,
                        imagen: "default_profile_img.png",
                        nacimiento: req.body.nacimiento,
                        Obra_Social_id: null,
                        Rol_id: req.body.userType,
                        especialidad: [{
                            id: req.body.especialidad
                        }]
                    }

                    userToEdit.push(o)
                }
            }
            console.log(userToEdit);
            db.Usuario.update(userToEdit[0], {
                where: {
                    id: req.params.id
                }, include: [{ association: 'especialidad' }]
            }).then(response => {
                console.log(response)
                return res.redirect("/prestadores/admin/users")
            })
        } else {
            return res.render('prestadoresViews/editarPrestador/:id', { errors: errors.mapped() })
        }
    },
    editandoPrestador: async (req, res) => {

        let usuario = await db.Usuario.findByPk(req.params.id, { include: [{ association: 'rol' }, { association: 'especialidad' }] })

        res.render('prestadoresViews/editarPrestador', { userToEdit: usuario })
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
        db.Profesional_Especialidad.destroy({ where: { Profesional_id: id } }).then(() => {
            db.Profesional_Tratamiento.destroy({ where: { Profesional_id: id } }).then(() => {
                db.Usuario.destroy({ where: { id: id } }).then(() => {
                    return res.redirect('/prestadores/eliminacionConfirmada');
                })
            })
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
    },

    secretariaTurnos: (req, res) => {
        return res.render('prestadoresViews/secretariaViews/turnosListado')
    }
}

module.exports = prestadoresController;