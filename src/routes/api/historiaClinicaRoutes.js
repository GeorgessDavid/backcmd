const express = require('express');
const apiController = require("../../services/historiaClinicaService.js");
const { apiKey } = require('../../../middlewares/application/loggedMiddleware.js');
const router = express.Router();

router.get('/:id',apiKey, apiController.paciente)
router.post('/createHistoria', apiController.createHistoria)
router.put('/updateHistoria', apiController.updateHistoria)

module.exports = router