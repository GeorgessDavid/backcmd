const express = require('express');
const especialidadesController = require("../controllers/especialidadesController");
const router = express.Router();

router.get("/",especialidadesController.index )

module.exports = router;
