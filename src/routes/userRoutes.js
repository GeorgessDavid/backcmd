const userController = require("../controllers/userController.js");

const express = require('express');
const router = express.Router();

router.get("/login",userController.login )

router.get("/register",userController.register )

router.post("/register",userController.save )

router.get("/editar",userController.vistaEditar )

router.post("/editar",userController.editar )


module.exports = router;
