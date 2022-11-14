/* REQUIRES CONTROLLERS */
const path = require('path')
const prestadoresController = require('../controllers/prestadoresControllers.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator')
/* VALIDACIONES - EXPRESS VALIDATOR */

let validaciones = {
    agregarMedicoPublico: [
        body('nombre').notEmpty().withMessage('Debe escribir un nombre.'),
        body('apellido').notEmpty().withMessage('Debe escribir un apellido.'),
        body('especialidad').notEmpty().withMessage('Debe escribir una especialidad.'),
        body('sexo').notEmpty().withMessage('Debe elegir un sexo').custom(value => {
            let input = req.body.sexo
        }),
        body('estudios').notEmpty().withMessage('Debe seleccionar si realiza estudios o no.').custom(value => {
            let input = req.body.estudios
        })],
    login: [
        body('userType').notEmpty().withMessage('Debe seleccionar el tipo de usuario.'),
        body('user').notEmpty().withMessage('Debe ingresar un nombre de usuario.'),
        body('password').notEmpty().withMessage('Debe ingresar una contraseña.'),
        body('secondPassword').notEmpty().withMessage('Debe ingresar la clave laboral asignada. En caso de no recordarla, debe consultar con las secretarias o el administrador.')
    ]
};
/* MUILTER CONFIGURACIÓN  */

const imgConfiguration = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/profilepictures'));
    },
    filename: function (req, file, cb) {
        let imageName = Date.now() + file.originalname;
        cb(null, imageName);
    }
});

const uploadFile = multer({ storage: imgConfiguration });

/* MIDDLEWAREs */
const logInMiddleware = require('../../middlewares/application/loggedMiddleware.js')
/* RUTAS */

/* PRESTADORES LOGIN */
router.get("/login", logInMiddleware.loggedHome, prestadoresController.index);

router.post("/login", validaciones.login, prestadoresController.login)

/* PRESTADORES HOME + FUNCTIONS */
router.get("/home", logInMiddleware.needLogin, prestadoresController.home)

router.get("/editandoPrestador/:id", logInMiddleware.needLogin, prestadoresController.editandoPrestador)

router.get("/agregarMedico", logInMiddleware.needLogin, prestadoresController.agregarMedico)

router.post("/agregarMedico", uploadFile.single('profileImg'), validaciones.agregarMedicoPublico, prestadoresController.agregarMedicoPublico)

router.get("/home/confirmDelete/:id", logInMiddleware.needLogin, prestadoresController.confirmarEliminacion);

router.delete("/home/confirmDelete/:id", prestadoresController.deletePrestador);

router.get("/eliminacionConfirmada", logInMiddleware.needLogin, prestadoresController.eliminacionConfirmada)

router.put("/editarPrestador/:id", uploadFile.single('profileImg'), prestadoresController.editarPrestador)

module.exports = router;
