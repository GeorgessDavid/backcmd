const express = require('express');
const router = express.Router();

router.use("/", require('./indexRoutes'))
router.use("/turnos", require('./turnosRoutes'))
router.use("/pacientes", require('./pacientesRoutes'))
router.use("/especialidades", require('./especialidadesRouter'))
router.use("/prestadores", require('./prestadoresRoutes'))

module.exports = router