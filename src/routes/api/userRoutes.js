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

router.post('/trabajadores', validations.addUsuario, apiController.createTrabajador)

module.exports = router