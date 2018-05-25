var express = require('express')
var controller = require('./users-controller')
var router = express.Router()
var auth = require('../../auth/auth.service')

router.post('/register', controller.register)
router.post('/forgot-password',  controller.forgotpassword)
router.post('/reset-password/:token',  controller.resetPassword)
router.get('/profile',auth.isAuthenticated(), controller.getProfile)
router.get('/profiles',  controller.getAllProfiles)

module.exports = router
