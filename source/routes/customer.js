const express = require('express')
const router = express.Router()
const CustomerController = require('../controllers/CustomerController')
const isAuth = require('../middlewares/isAuth')

router.get('/', isAuth, CustomerController.getAllRoom)

module.exports = router