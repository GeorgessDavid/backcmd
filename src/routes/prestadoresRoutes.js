const prestadoresController = require('../controllers/prestadoresControllers.js');

const express = require('express');
const router = express.Router();

router.get("/login", prestadoresController.index);

module.exports = router;
