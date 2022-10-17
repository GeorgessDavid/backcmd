const express = require('express');
const router = express.Router();

router.use("/", require('./indexRoutes'))
router.use("/turnos", require('./turnosRoutes'))
router.use("/users", require('./userRoutes'))
router.use("/especialidades", require('./especialidadesRouter'))

module.exports = router