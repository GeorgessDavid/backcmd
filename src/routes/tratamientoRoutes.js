const tratamientosServices = require("../services/tratamientosServices.js")

const express = require('express');
const router = express.Router();

router.get("/api/listar",tratamientosServices.apiListar) //api




module.exports = router;