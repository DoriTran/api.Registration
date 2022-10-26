const express = require('express')
const router  = express.Router()
const AuthController = require('../controllers/AccountController')

// Default password 123456789
// Route: /account
router.get('/profile', AuthController.getUser)
router.get('/getAll', AuthController.getAllUser)
router.post('/login', AuthController.login)
router.post('/add', AuthController.addUser)
router.post('/test', AuthController.test)

module.exports = router