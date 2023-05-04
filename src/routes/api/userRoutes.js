const express = require('express');
const apiController = require("../../services/userServices.js");
const router = express.Router();

/* REQUIRES MIDDLEWARES */
const validations = require('../../../middlewares/routes/prestadoresValidations')


router.get('/allUsers', apiController.getAllUsers)
router.get('/administradores', apiController.getAdmins)
router.get('/secretaria', apiController.getSecretarias)
router.get("/profesionales", apiController.getProfesionales)
router.get('/pacientes', apiController.getPacientes)
router.get('/profesional/:id', apiController.getOneUser)

router.post('/trabajadores', validations.addUsuario, apiController.createTrabajador)

router.put('/changePassword/:id', validations.changePassword, apiController.updatePassword)
router.put('/updateUser/:id', validations.updateUser, apiController.updateUser)

// POST - SECRETARIA

router.post('/secretaria/addPaciente', validations.addPaciente, apiController.addPaciente)


module.exports = router