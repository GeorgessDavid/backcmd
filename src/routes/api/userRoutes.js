const express = require('express');
const apiController = require("../../services/userServices.js");
const router = express.Router();


router.get('/allUsers', apiController.getAllUsers)
router.get('/administradores', apiController.getAdmins)
router.get('/secretaria', apiController.getSecretarias)
router.get("/profesionales", apiController.getProfesionales)
router.get('/pacientes', apiController.getPacientes)

module.exports = router