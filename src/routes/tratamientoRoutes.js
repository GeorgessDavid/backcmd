const tratamientosServices = require("../services/tratamientosServices.js")

const express = require('express');
const router = express.Router();

router.get("/api",tratamientosServices.apiListar) //api
router.post("/create", tratamientosServices.create)
router.put("/update/:id", tratamientosServices.update)
router.delete("/delete/:id", tratamientosServices.delete)




module.exports = router;