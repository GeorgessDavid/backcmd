const turnosController = require("../controllers/turnosController.js");

const express = require('express');
const router = express.Router();

router.get("/",turnosController.index )

module.exports = router;
