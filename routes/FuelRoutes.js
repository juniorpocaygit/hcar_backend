const express = require('express')
const router = express.Router()
const FuelController = require('../controllers/FuelController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, FuelController.create)
router.patch('/edit/:id', verifyToken, FuelController.editFuel)
router.delete('/:id', verifyToken, FuelController.deleteFuel)
router.get('/:id', verifyToken, FuelController.getFuelById)
router.get('/car/:id', verifyToken, FuelController.getFuelByCar)

module.exports = router
