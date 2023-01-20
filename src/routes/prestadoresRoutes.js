/* REQUIRES CONTROLLERS */
const path = require('path')
const prestadoresController = require('../controllers/prestadoresControllers.js');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator')
const validaciones = require('../../middlewares/routes/prestadoresValidations.js')

let validacionMedicoPublico = [  //falta las opciones
    body('nombre').notEmpty().withMessage('Debe escribir un nombre.'),
    body('apellido').notEmpty().withMessage('Debe escribir un apellido.'),
    body('especialidad').notEmpty().withMessage('Debe escribir una especialidad.'),
    body('sexo').notEmpty().withMessage('Debe elegir un sexo').custom(value => {
        let input = req.body.sexo
    }),
    body('estudios').notEmpty().withMessage('Debe seleccionar si realiza estudios o no.').custom(value => {
        let input = req.body.estudios
    })
]



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


/* USUARIOS ROUTES */
router.get("/editandoPrestador/:id", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.editandoPrestador)

router.get("/agregarMedico", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.agregarMedico)

router.post("/agregarMedico", uploadFile.single('profileImg'), validaciones.addUsuario, prestadoresController.agregarMedicoPublico)


router.post("/editandoPrestador/:id",uploadFile.single('profileImg') ,validacionMedicoPublico, prestadoresController.editarMedicoPublico) //

router.get("/home/confirmDelete/:id", logInMiddleware.needLogin,  userTypeAuth.admin, prestadoresController.confirmarEliminacion);


router.delete("/home/confirmDelete/:id", prestadoresController.deletePrestador);

router.get("/eliminacionConfirmada", logInMiddleware.needLogin, userTypeAuth.admin, prestadoresController.eliminacionConfirmada)

router.put("/editarPrestador/:id", uploadFile.single('profileImg'), prestadoresController.editarPrestador)

/* ESPECIALIDAD ROUTES */

router.get("/especialidades", logInMiddleware.needLogin, prestadoresController.especialidades)

router.get("/agregarEspecialidad", logInMiddleware.needLogin, prestadoresController.agregarEspecialidad);

router.post("/agregarEspecialidad", validaciones.addEspecialidad, prestadoresController.agregarEspecialidadSubmit);


/* LOGOUT */
router.get("/logout", prestadoresController.logout )

module.exports = router;
