const express = require('express');
const apiController = require("../../services/profesionalesServices.js");
const router = express.Router();


router.get("/profesionales", apiController.get)

module.exports = router