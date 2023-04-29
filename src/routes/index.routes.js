const express = require('express');
const router = express.Router();

router.use("/", require('./homeRoutes'))
router.use("/turnos", require('./turnosRoutes'))
router.use("/pacientes", require('./pacientesRoutes'))
router.use("/especialidades", require('./especialidadesRouter'))
router.use("/prestadores", require('./prestadoresRoutes'))
router.use("/apiUsuarios", require('./api/userRoutes'))
router.use("/tratamientos", require('./tratamientoRoutes'))
router.use('/historiaClinica', require('./api/historiaClinicaRoutes'))

module.exports = router