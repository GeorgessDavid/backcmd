const indexController = require("../controllers/indexController.js");

const express = require('express');
const router = express.Router();

router.get("/",indexController.index )

module.exports = router;
