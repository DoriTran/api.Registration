const express = require('express')
const router  = express.Router()
const AuthController = require('../controllers/AuthController')
const isAdmin = require('../middlewares/isAdmin')

// Default password 12345
router.post('/', AuthController.login)
router.get('/getAll', isAdmin, AuthController.getAllUser)
router.post('/add', isAdmin, AuthController.addUser)
router.put('/update',isAdmin, AuthController.updateUser)
router.delete('/delete', isAdmin, AuthController.deleteUser)

module.exports = router