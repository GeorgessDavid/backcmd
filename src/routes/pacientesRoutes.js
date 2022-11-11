/* REQUIRES CONTROLLERS */
const path = require('path')
const pacientesController = require("../controllers/pacientesController.js");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');


/* VALIDACIONES - EXPRESS VALIDATOR */

let validaciones = [
    body('usuario').notEmpty().withMessage('Debe escribir un nombre de usuario.'),
    body('nombre').notEmpty().withMessage('Debe escribir un nombre.'),
    body('apellido').notEmpty().withMessage('Debe escribir un apellido.')
  //  body('email').notEmpty().withMessage('Debe escribir un email valido.'), hacer validar email

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
router.get("/register",pacientesController.register )
router.post("/register",pacientesController.save )

router.get("/",pacientesController.index )
router.get("/:id",pacientesController.detallePaciente )
router.put("/editar/:id",pacientesController.editarPaciente )

router.delete('/delete/:id', pacientesController.delete);
router.put("/editarPaciente/:id", uploadFile.single('profileImg'), pacientesController.editarPaciente) // ver archivo o imagen a subir

module.exports = router;
