/* REQUIRES CONTROLLERS */
const path = require('path')
const pacientesController = require("../controllers/pacientesController.js");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');

/* VALIDACIONES - EXPRESS VALIDATOR */
let validacionesLogin = [
    body('usuario').notEmpty().withMessage('Debes ingresar un usuario'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña')
]

let validacionesRegistro = [
    body('nombre').notEmpty().withMessage('Completar Nombre'),
    body('apellido').notEmpty().withMessage('Completar Apellido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
]

let validaciones = [
    body('usuario').notEmpty().withMessage('Usuario incorrecto.'),
    body('nombre').notEmpty().withMessage('Debe escribir un nombre.'),
    body('apellido').notEmpty().withMessage('Debe escribir un apellido.'),
    body('email').isEmail().withMessage('Debe escribir un email válido.'),
    body('password').isLength({ min: 6 }).withMessage('contraseña incorrecta'),
]

/* MIDDLEWARES REQUIRE */

const logInMiddleware = require('../../middlewares/application/loggedMiddleware.js')

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
router.get("/login", logInMiddleware.loggedHome, pacientesController.login )
router.post("/login",validacionesLogin, pacientesController.loginProcess)
router.get("/register", pacientesController.register )
router.post("/register",validacionesRegistro,pacientesController.save )
router.get("/logout", pacientesController.logout)

router.get("/",pacientesController.index )
router.get("/:id",pacientesController.pacientesDetalle )
router.put("/editar/:id",validaciones, pacientesController.pacientesEditar )

router.delete('/delete/:id', pacientesController.delete);

module.exports = router;
