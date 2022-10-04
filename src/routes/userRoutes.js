const userController = require("../controllers/userController.js");

const express = require('express');
const router = express.Router();

router.get("/login",userController.login )

router.get("/register",userController.register )

module.exports = router;
