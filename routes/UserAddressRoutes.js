const express = require('express')
const router = express.Router()
const UserAddressController = require('../controllers/UserAddressController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, UserAddressController.create)
router.post('/user', verifyToken, UserAddressController.getAddressByToken)
router.patch('/edit/:id', verifyToken, UserAddressController.editAddress)
router.delete('/:id', verifyToken, UserAddressController.deleteAddress)
router.get('/:id', verifyToken, UserAddressController.getAddressById)

module.exports = router
