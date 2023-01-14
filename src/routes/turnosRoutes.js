const turnosController = require("../controllers/turnosController.js");
const turnosServices = require("../services/turnosServices.js")

const express = require('express');
const router = express.Router();

const logInMiddleware = require('../../middlewares/application/loggedMiddleware.js')

router.get("/",logInMiddleware.needLogin,turnosController.index )

router.get("/crear",logInMiddleware.needLogin,turnosController.crear )
router.post("/crear",logInMiddleware.needLogin,turnosController.store )

router.get("/listar",logInMiddleware.needLogin,turnosController.listar )

router.get("/api/listar",turnosServices.apiListar ) //api


module.exports = router;
