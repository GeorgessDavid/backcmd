/* REQUIRES CONTROLLERS */
const path = require('path')
const pacientesController = require("../controllers/pacientesController.js");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');


/* VALIDACIONES - EXPRESS VALIDATOR */

let validaciones = [
    body('nombre').notEmpty().withMessage('Debe escribir un nombre.'),
    body('apellido').notEmpty().withMessage('Debe escribir un apellido.'),
    body('especialidad').notEmpty().withMessage('Debe escribir una especialidad.')
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
router.put("/editarPaciente/:id", uploadFile.single('profileImg'), pacientesController.editarPaciente)

module.exports = router;
