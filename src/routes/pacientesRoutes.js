/* REQUIRES CONTROLLERS */
const path = require('path')
const pacientesController = require("../controllers/pacientesController.js");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

/* VALIDACIONES - EXPRESS VALIDATOR */
let validacionesRegistro = [
    body('nombre').notEmpty().withMessage('Completar Nombre'),
    body('apellido').notEmpty().withMessage('Completar Apellido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 15 }).withMessage('La contraseña debe tener al menos 15 caracteres'),
]

let validaciones = [
    body('usuario').notEmpty().withMessage('Debe escribir un nombre de usuario.'),
    body('nombre').notEmpty().withMessage('Debe escribir un nombre.'),
    body('apellido').notEmpty().withMessage('Debe escribir un apellido.'),
    body('email').isEmail().withMessage('Debe escribir un email válido.'), 

]

/* MULTER CONFIGURACIÓN  */

const imgConfiguration = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/profilepictures')); 
    },
    filename: function (req, file, cb) {
        let imageName = Date.now() + file.originalname;
        cb(null, imageName);
    }
});

const uploadFile = multer({ storage: imgConfiguration }); //chequear archivos


/* RUTAS */
router.get("/login",pacientesController.login )
router.get("/register", pacientesController.register )
router.post("/register",validacionesRegistro,pacientesController.save )

router.get("/",pacientesController.index )
router.get("/:id",pacientesController.pacientesDetalle )
router.put("/editar/:id",validaciones, pacientesController.pacientesEditar )

router.delete('/delete/:id', pacientesController.delete);

module.exports = router;
