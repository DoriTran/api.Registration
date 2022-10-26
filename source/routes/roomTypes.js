const express = require('express')
const router = express.Router()
const RoomTypesController = require('../controllers/RoomTypesController')
const isAdmin = require('../middlewares/isAdmin')
const isAuth = require('../middlewares/isAuth')

router.get('/getTypes', isAuth, RoomTypesController.getAll)
router.post('/addType', isAdmin, RoomTypesController.add)
router.put('/updateType', isAdmin, RoomTypesController.update)
router.delete('/deleteType', isAdmin, RoomTypesController.delete)

module.exports = router