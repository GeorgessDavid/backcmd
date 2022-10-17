const userController = require("../controllers/userController.js");

const express = require('express');
const router = express.Router();

router.get("/login",userController.login )
router.get("/register",userController.register )
router.post("/register",userController.save )

router.get("/",userController.index )
router.get("/:id",userController.detalleUser )
router.put("/editar/:id",userController.editarUser )

router.delete('/delete/:id', userController.delete);

module.exports = router;
