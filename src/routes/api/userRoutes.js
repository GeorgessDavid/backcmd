const express = require('express');
const apiController = require("../../services/userServices.js");
const router = express.Router();

/* REQUIRES MIDDLEWARES */
const validations = require('../../../middlewares/routes/prestadoresValidations');
const { apiKey } = require('../../../middlewares/application/loggedMiddleware.js');


router.get('/allUsers', apiKey, apiController.getAllUsers)
router.get('/administradores', apiKey, apiController.getAdmins)
router.get('/secretaria', apiKey, apiController.getSecretarias)
router.get("/profesionales", apiKey, apiController.getProfesionales)
router.get('/pacientes', apiKey, apiController.getPacientes)
router.get('/profesional/:id', apiKey, apiController.getOneUser)

router.post('/trabajadores', validations.addUsuario, apiController.createTrabajador)

router.put('/changePassword/:id', validations.changePassword, apiController.updatePassword)
router.put('/updateUser/:id', validations.updateUser, apiController.updateUser)

// POST - SECRETARIA

router.post('/secretaria/addPaciente', validations.addPaciente, apiController.addPaciente)

// POST - USUARIOS
router.post('/addUser', validations.addUser, apiController.addUser)


module.exports = router