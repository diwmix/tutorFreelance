const Router = require('express')
const router = new Router()
const registrationController = require('../authController/registrationControllers.js')
const loginController = require('../authController/loginControllers.js')


router.post('/registration', registrationController.registration)
router.post('/login', loginController.login)

  


module.exports = router