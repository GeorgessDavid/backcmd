const express = require('express');
const apiController = require("../../services/historiaClinicaService.js");
const router = express.Router();

router.get('/:id', apiController.paciente)
router.post('/createHistoria', apiController.createHistoria)
router.put('/updateHistoria', apiController.updateHistoria)

module.exports = router