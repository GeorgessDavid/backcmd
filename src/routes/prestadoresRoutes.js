/* REQUIRES CONTROLLERS */
const path = require('path')
const prestadoresController = require('../controllers/prestadoresControllers.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');

/* MUILTER CONFIGURACIÓN  */

const imgConfiguration = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/profilepictures'));
    },
    filename: function(req, file, cb){
        let imageName = Date.now() + file.originalname;
        cb(null,imageName);
    }
});

const uploadFile = multer({storage: imgConfiguration});

/* RUTAS */

router.get("/login", prestadoresController.index);

router.post("/login", prestadoresController.login)

router.get("/home", prestadoresController.home)

router.get("/editandoPrestador/:id", prestadoresController.editandoPrestador)

router.get("/agregarMedico", prestadoresController.agregarMedico)

router.post("/agregarMedico", uploadFile.single('profileImg'), prestadoresController.agregarMedicoPublico)

router.get("/home/confirmDelete/:id", prestadoresController.confirmarEliminacion);

router.delete("/home/confirmDelete/:id", prestadoresController.deletePrestador);

router.get("/eliminacionConfirmada", prestadoresController.eliminacionConfirmada)

router.put("/editarPrestador/:id", uploadFile.single('profileImg'), prestadoresController.editarPrestador)
module.exports = router;
