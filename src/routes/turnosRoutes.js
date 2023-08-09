const turnosController = require("../controllers/turnosController.js");
const turnosServices = require("../services/turnosServices.js")

const express = require('express');
const router = express.Router();

const logInMiddleware = require('../../middlewares/application/loggedMiddleware.js')
const mantenimiento = require('../../middlewares/application/mantenimiento.js')

router.get("/", logInMiddleware.needLogin, mantenimiento.activo, turnosController.index )

router.get("/crear", logInMiddleware.needLogin, mantenimiento.activo, turnosController.crear )
router.post("/crear",logInMiddleware.needLogin,turnosController.store )

router.get("/listar",logInMiddleware.needLogin,turnosController.listar )

router.delete("/borrar/:id",logInMiddleware.needLogin,turnosController.delete )

router.get("/api/listar", logInMiddleware.apiKey, turnosServices.apiListar ) //api
router.get("/api/profesional/", logInMiddleware.apiKey, turnosServices.byProfessional)


module.exports = router;
