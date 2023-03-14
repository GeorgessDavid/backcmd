const db = require('../../database/models')
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const {where} = require("sequelize");

let usuarios = {
    getAllUsers: async (req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({ include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }, {association: 'tratamiento'}] })


            let data = {
                "total": usuarios.length,
                "data": usuarios,
                "status": 200,
            }
            res.json(data)

        } catch (err) {
            res.render(err)
            console.log(err)
        }

    },

    getAdmins: async (req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({ include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }] })

            let administradores = []

            for (x of usuarios) {
                if (x.Rol_id == 1) {
                    administradores.push(x)
                }
            }

            let data = {
                "total": administradores.length,
                "data": administradores,
                "status": 200
            }

            res.json(data)
        } catch (err) {
            res.render(err)
            console.log(err)
        }
    },

    getSecretarias: async (req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({ include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }] })

            let secretarias = []

            for (x of usuarios) {
                if (x.Rol_id == 2) {
                    secretarias.push(x)
                }
            }

            let data = {
                "total": secretarias.length,
                "data": secretarias,
                "status": 200
            }

            res.json(data)
        } catch (err) {
            res.render(err)
            console.log(err)
        }
    },


    getProfesionales: async (req, res) => {
/*         try { */

            const profesionales = await db.Usuario.findAll(
                {
                    where: {
                        Rol_id: 3
                    },
                    include: [{ association: 'especialidad' }, { association: 'rol' }, {association: 'tratamiento'}]
                }
            )

            res.json({ "total": profesionales.length, "data": profesionales, "status": 200 })
        /* } catch (error) {
            res.render(error);
            console.log(error)
        } */
    },

    getOneUser: async (req, res) => {
        try {
            const usuario = await db.Usuario.findOne({where: 
                {alias: req.params.id},
                include: [{association: 'rol'}, {association: 'especialidad'},{association: 'tratamiento'} ]})

            return res.json({"data": usuario, "status": 200})
        } catch (err) {
            console.log(err)
            res.render(err)
        }
    },

    getPacientes: async (req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({ include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }] })

            let pacientes = []

            for (x of usuarios) {

                if (x.Rol_id == 4) {
                    pacientes.push(x)
                }
            }

            let data = {
                "total": pacientes.length,
                "data": pacientes,
                "status": 200
            }

            res.json(data)
        } catch (err) {
            res.render(err)
            console.log(err)
        }
    },

    createTrabajador: async (req, res) => {
        let errors = validationResult(req);

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
                                res.json({
                                    "data": resultados,
                                    "status": 201,
                                    "msg": "Creado exitosamente."
                                })
                                return res.redirect("/prestadores/home")
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
                                    res.json({
                                        "data": profesional,
                                        "status": 201,
                                        "msg": "Creado exitosamente."
                                    })
                                    return res.redirect("/prestadores/home")
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
                                return res.json({
                                    "data": resultados,
                                    "status": 201,
                                    "msg": "Creado exitosamente."
                                })

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
                                    res.json({
                                        "data": profesional,
                                        "status": 201,
                                        "msg": "Creado exitosamente."
                                    })
                                    return res.redirect("/prestadores/home")
                                })
                            })
                        }
                    }
                } else {

                    let info = {
                        "status": 400,
                        "errorType": "400.3 - Email is already in use.",
                        "errors": {
                            "alias": {
                                "msg": "Esta dirección de email ya está en uso."
                            }
                        }
                    }

                    return res.json(info)
                }
            } else {
                let info = {
                    "status": 400,
                    "errorType": "400.2 - User is already in use.",
                    "errors": {
                        "alias": {
                            "msg": "Este nombre de usuario ya está en uso."
                        }
                    }
                }

                return res.json(info)
            }
        } else {
            let info = {
                "status": 400,
                "errorType": "400.1 - Campos vacíos",
                "errors": errors.mapped()
            }
            return res.json(info)

        }
    }
}

module.exports = usuarios