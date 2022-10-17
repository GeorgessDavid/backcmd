const prestadoresController = require('../controllers/prestadoresControllers.js');
const funciones = require('../../funciones/funciones.js')
const express = require('express');
const router = express.Router();

router.get("/login", prestadoresController.index);

router.post("/login", prestadoresController.login)

router.get("/home", prestadoresController.home)

router.get("/agregarMedico", prestadoresController.agregarMedico)

router.put("/agregarMedico", funciones.agregarMedicoPublico)

module.exports = router;
