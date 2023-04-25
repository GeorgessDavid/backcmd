/* REQUIRES CONTROLLERS */
const path = require('path')
const prestadoresController = require('../controllers/prestadoresControllers.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const validaciones = require('../../middlewares/routes/prestadoresValidations.js')

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
const userTypeAuth = require('../../middlewares/application/privilegeAuthMiddleware.js')
/* RUTAS */

router.use(logInMiddleware.defaultLocals)

/* PRESTADORES LOGIN */
router.get("/login", logInMiddleware.loggedHome, prestadoresController.index);
router.post("/login", prestadoresController.login)

/*  ADMINS ROUTES */
router.get("/admin/home", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.home)
router.get('/admin/practicasMedicas', logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.practicasMedicas)
router.get('/admin/users', logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.users)

/* SECRETARIA ROUTES */
router.get('/secretaria/home', logInMiddleware.needLogin, userTypeAuth.secretaria, prestadoresController.home)
router.get('/secretaria/turnos', logInMiddleware.needLogin, userTypeAuth.secretaria, prestadoresController.secretariaTurnos);
router.get('/secretaria/agregarPaciente', logInMiddleware.needLogin, userTypeAuth.secretaria, prestadoresController.secretariaAddPaciente);

/* PROFESIONALES ROUTES */
router.get('/profesional/home', logInMiddleware.needLogin, userTypeAuth.medic, prestadoresController.home)
router.get('/profesional/turnos', logInMiddleware.needLogin, userTypeAuth.medic, prestadoresController.profesionalTurnos)






/* USUARIOS ROUTES */
router.get("/editandoPrestador/:id", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.editandoPrestador)

router.get("/agregarMedico", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.agregarMedico)

router.post("/agregarMedico", uploadFile.single('profileImg'), validaciones.addUsuario, prestadoresController.addUserPost)//

router.get("/home/confirmDelete/:id", logInMiddleware.needLogin,  userTypeAuth.admin, prestadoresController.confirmarEliminacion);

router.delete("/home/confirmDelete/:id", prestadoresController.deletePrestador);

router.get("/eliminacionConfirmada", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.eliminacionConfirmada)

router.put("/editarUsuario/:id", uploadFile.single('profileImg'), prestadoresController.editarUsuario)

/* ESPECIALIDAD ROUTES */

router.get("/especialidades", logInMiddleware.needLogin, prestadoresController.especialidades)

router.get("/agregarEspecialidad", logInMiddleware.needLogin, prestadoresController.agregarEspecialidad);

router.post("/agregarEspecialidad", validaciones.addEspecialidad, prestadoresController.agregarEspecialidadSubmit);


/* LOGOUT */
router.get("/logout", prestadoresController.logout )

module.exports = router;
