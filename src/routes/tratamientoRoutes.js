const { apiKey } = require("../../middlewares/application/loggedMiddleware.js");
const tratamientosServices = require("../services/tratamientosServices.js")

const express = require('express');
const router = express.Router();



router.get('/', tratamientosServices.render)
router.get("/api", apiKey, tratamientosServices.apiListar) //api
router.post("/create", tratamientosServices.create)
router.put("/update/:id", tratamientosServices.update)
router.delete("/delete/:id", tratamientosServices.delete)




module.exports = router;