const express = require('express');
const especialidadesController = require("../controllers/especialidadesController");
const { apiKey } = require('../../middlewares/application/loggedMiddleware');
const router = express.Router();

router.get("/",especialidadesController.index )
router.get('/api', apiKey, especialidadesController.getEspecialidades)
router.delete("/eliminar/:id", especialidadesController.delete)
router.put('/editar/:id', especialidadesController.update)

module.exports = router;
