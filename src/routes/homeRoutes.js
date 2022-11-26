const indexController = require("../controllers/homeController.js");

const express = require('express');
const router = express.Router();

router.get("/",indexController.index )

module.exports = router;
