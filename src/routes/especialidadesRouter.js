const express = require('express');
const especialidadesController = require("../controllers/especialidadesController");
const router = express.Router();

router.get("/",especialidadesController.index )
router.get('/api', especialidadesController.getEspecialidades)

module.exports = router;
