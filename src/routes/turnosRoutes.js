const turnosController = require("../controllers/turnosController.js");

const express = require('express');
const router = express.Router();

const logInMiddleware = require('../../middlewares/application/loggedMiddleware.js')

router.get("/",logInMiddleware.needLogin,turnosController.index )

router.get("/crear",logInMiddleware.needLogin,turnosController.crear )
router.post("/crear",logInMiddleware.needLogin,turnosController.store )

router.get("/listar",logInMiddleware.needLogin,turnosController.listar )

module.exports = router;
