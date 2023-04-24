const express = require('express');
const apiController = require("../../services/historiaClinicaService.js");
const router = express.Router();

router.get('/:id', apiController.paciente)

module.exports = router