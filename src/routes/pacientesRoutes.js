const pacientesController = require("../controllers/pacientesController.js");

const express = require('express');
const router = express.Router();
const { body } = require('express-validator')

let validaciones = [
    body('nombre').notEmpty().withMessage('Completar Nombre'),
    body('apellido').notEmpty().withMessage('Completar Apellido'),
    body('email').notEmpty().withMessage('Completar Email'),
    body('password').isLength({ min: 8 }).withMessage('La clave debe tener 8 caracteres o mas')
]

router.get("/login",pacientesController.login )
router.get("/register", pacientesController.register )
router.post("/register",validaciones,pacientesController.save )

router.get("/",pacientesController.index )
router.get("/:id",pacientesController.detallePaciente )
router.put("/editar/:id",pacientesController.editarPaciente )

router.delete('/delete/:id', pacientesController.delete);

module.exports = router;
