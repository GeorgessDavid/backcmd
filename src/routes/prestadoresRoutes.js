const prestadoresController = require('../controllers/prestadoresControllers.js');

const express = require('express');
const router = express.Router();

router.get("/login", prestadoresController.index);

router.post("/login", prestadoresController.login)

router.get("/prestadores/home", prestadoresController.home)

module.exports = router;
