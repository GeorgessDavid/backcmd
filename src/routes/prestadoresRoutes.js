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

router.get("/home/:id", prestadoresController.detallePrestador)

router.get("/agregarMedico", prestadoresController.agregarMedico)

router.post("/agregarMedico", uploadFile.single('profileImg'), prestadoresController.agregarMedicoPublico)

module.exports = router;
