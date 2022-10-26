const express = require('express')
const router = express.Router()
const ServiceController = require('../controllers/ServiceController')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

router.get('/getServices', isAuth, ServiceController.getAllService)
router.get('/getService', isAuth, ServiceController.getOneService)
router.post('/addService', isAdmin, ServiceController.add)
router.put('/updateService', isAdmin, ServiceController.update)
router.delete('/deleteService', isAdmin, ServiceController.delete)

module.exports = router