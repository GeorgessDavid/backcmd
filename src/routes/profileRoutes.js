const path = require('path')
const express = require('express')
const userLoginValidation = require('../../middlewares/application/loggedMiddleware')
const router = express.Router()
const profileController = require('../controllers/profileController.js')

router.use(userLoginValidation.defaultLocals)


router.get('/:id', userLoginValidation.needLogin, userLoginValidation.selfProfile,profileController.profile )

module.exports = router