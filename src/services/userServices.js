const db = require('../../database/models')
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs')
const { where } = require("sequelize");
const moment = require('moment');
const { logout } = require('../controllers/pacientesController');

let usuarios = {
    getAllUsers: async (req, res) => {
        try {
            const usuarios = await db.Usuario.findAll({ include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }, { association: 'tratamiento' }] })


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
        /*   try {
   */
        const profesionales = await db.Usuario.findAll(
            {
                where: {
                    Rol_id: 3
                },
                include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'tratamiento' }, { association: 'planilla_horaria' }]
            }
        )
        let data = []

        for (let u of profesionales) {

            let horarios = u.planilla_horaria;

            let agenda = []

            for (let i = 0; i < horarios.length; i++) {
                const element = horarios[i].dia_semana;

                let horaDeInicio = moment(horarios[i].hora_inicio, 'HH:mm')
                let duracion = horarios[i].duracion
                let horaDeFin = moment(horarios[i].hora_fin, 'HH:mm')

                let diaToPush = {
                    dia_semana: element,
                    horarios: [horaDeInicio.format('HH:mm')]
                }



                while (horaDeInicio.isBefore(horaDeFin) && horaDeInicio.clone().add(duracion, 'minutes').isSameOrBefore(horaDeFin)) {
                    console.log(horaDeInicio.format('HH:mm'))
                    horaDeInicio.add(duracion, 'minutes')

                    diaToPush.horarios.push(horaDeInicio.format('HH:mm'))
                }

                agenda.push(diaToPush)
            }

            let unProfesional = {
                profesional: u,
                horarios: agenda
            }

            data.push(unProfesional)
        }



        console.log(data)

        res.json({ "total": profesionales.length, "data": data, "status": 200 })
        /*     } catch (error) {
                res.render(error);
                console.log(error)
            } */
    },

    getOneUser: async (req, res) => {
        try {
            const usuario = await db.Usuario.findOne({
                where:
                    { alias: req.params.id },
                include: [{ association: 'rol' }, { association: 'especialidad' }, { association: 'tratamiento' }, { association: 'planilla_horaria' }]
            })

            return res.json({ "data": usuario, "status": 200 })
        } catch (err) {
            console.log(err)
            res.render(err)
        }
    },

    getPacientes: async (req, res) => {
        /*         try { */
        const usuarios = await db.Usuario.findAll({ order: [['apellido', 'ASC']] }, { include: [{ association: 'especialidad' }, { association: 'rol' }, { association: 'obra_social' }] })

        let pacientes = []

        for (x of usuarios) {

            if (x.Rol_id == 4) {
                const fechaNacimiento = moment(x.nacimiento).format('DD-MM-YYYY')

                let objPaciente = {
                    id: x.id,
                    alias: x.alias,
                    nombre: x.nombre,
                    apellido: x.apellido,
                    email: x.email,
                    clave: x.clave,
                    sexo: x.sexo == true ? 'Masculino' : 'Femenino',
                    dni: x.dni,
                    domicilio: x.domicilio,
                    telefono: x.telefono,
                    nacimiento: fechaNacimiento,
                    obra_social: x.obra_social ? x.obra_social : 'PARTICULAR'
                }


                pacientes.push(objPaciente)
            }
        }

        let data = {
            "total": pacientes.length,
            "data": pacientes,
            "status": 200
        }

        res.json(data)
        /*         } catch (err) {
                    res.render(err)
                    console.log(err)
                } */
    },

    createTrabajador: async (req, res) => {
        let errors = validationResult(req);
        let oldData = req.body
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
                        "oldData": oldData,
                        "errorType": 400.3,
                        "errorName": "Email is already in use.",
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
                    "oldData": oldData,
                    "errorType": 400.2,
                    "errorName": 'Username is already in use.',
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
                "oldData": oldData,
                "errorType": 400.1,
                "errorName": "Email is already in use.",
                "errors": errors.mapped()
            }
            return res.json(info)

        }
    },
    addPaciente: async (req, res) => {
        let errors = validationResult(req);

        let oldData = req.body

        if (errors.isEmpty()) {

            let aliasExistente = await db.Usuario.findOne({ where: { alias: req.body.alias } })

            let emailExistente = await db.Usuario.findOne({ where: { email: req.body.email } })

            if (!aliasExistente) {
                if (!emailExistente) {
                    db.Usuario.create({
                        Rol_id: 4,
                        alias: req.body.alias,
                        clave: bcrypt.hashSync(req.body.email, 10),
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        email: req.body.email,
                        dni: req.body.dni,
                        domicilio: req.body.domicilio,
                        telefono: req.body.telefono,
                        sexo: req.body.sexo === 'masculino' ? true : false,
                        nacimiento: req.body.nacimiento,
                        matricula: null,
                        Obra_Social_id: null,
                        imagen: "default_profile_img.png"
                    }).then(resultados => {
                        let data = {
                            "data": resultados,
                            "result": "Creado exitosamente",
                            "status": 201
                        }

                        return res.json(data)
                    })
                } else {

                    let info = {
                        "status": 400,
                        "oldData": oldData,
                        "errorType": 400.3,
                        "errorName": "Email is already in use.",
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
                    "oldData": oldData,
                    "errorType": 400.2,
                    "errorName": 'Username is already in use.',
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
                "oldData": oldData,
                "errorType": 400,
                "errorName": "Empty field",
                "errors": errors.mapped()
            }
            return res.json(info)

        }
    },
    updatePassword: async (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let userToChange = await db.Usuario.findOne({ where: { alias: req.body.alias } })

            let toCompare = bcrypt.compareSync(req.body.oldPassword, userToChange.clave)

            if (toCompare) {
                db.Usuario.update({ clave: bcrypt.hashSync(req.body.newPassword, 10) }, { where: { alias: userToChange.alias } })

                let data = {
                    "status": 201,
                    "msg": 'Modificado correctamente.'
                }


                req.session.destroy();
                res.clearCookie('rememberMe')

                return res.json(data)
            } else {
                return res.json({
                    "status": 401,
                    "error": 'Contraseña incorrecta'
                })
            }
        } else {
            let data = {
                "status": 402,
                "error": errors.mapped()
            }

            return res.json(data)
        }
    }
}

module.exports = usuarios