const express = require('express')
const router  = express.Router()
const MessController = require('../controllers/MessController')
const isAuth = require('../middlewares/isAuth')

router.post('/messages',  isAuth, MessController.getAll)
router.post('/send',  isAuth, MessController.sendMessage)
router.get('/partners',  isAuth, MessController.getAllPartner)
router.get('/user', isAuth, MessController.getOneUser)

module.exports = router