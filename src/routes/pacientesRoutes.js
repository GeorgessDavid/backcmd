const pacientesController = require("../controllers/pacientesController.js");

const express = require('express');
const router = express.Router();
const { body } = require('express-validator')

let validaciones = [
    body('nombre').notEmpty().withMessage('Completar Nombre'),
    body('apellido').notEmpty().withMessage('Completar Apellido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 15 }).withMessage('La contraseña debe tener al menos 15 caracteres'),
]

router.get("/login",pacientesController.login )
router.get("/register", pacientesController.register )
router.post("/register",validaciones,pacientesController.save )

router.get("/",pacientesController.index )
router.get("/:id",pacientesController.detallePaciente )
router.put("/editar/:id",pacientesController.editarPaciente )

router.delete('/delete/:id', pacientesController.delete);

module.exports = router;
