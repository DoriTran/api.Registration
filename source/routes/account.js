const express = require('express')
const router  = express.Router()
const AuthController = require('../controllers/AccountController')

// Default password 12345
router.post('/', AuthController.login)
router.get('/getAll', AuthController.getAllUser)
router.post('/add', AuthController.addUser)

module.exports = router