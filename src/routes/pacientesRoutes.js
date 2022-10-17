const pacientesController = require("../controllers/pacientesController.js");

const express = require('express');
const router = express.Router();

router.get("/login",pacientesController.login )
router.get("/register",pacientesController.register )
router.post("/register",pacientesController.save )

router.get("/",pacientesController.index )
router.get("/:id",pacientesController.detallePaciente )
router.put("/editar/:id",pacientesController.editarPaciente )

router.delete('/delete/:id', pacientesController.delete);

module.exports = router;
