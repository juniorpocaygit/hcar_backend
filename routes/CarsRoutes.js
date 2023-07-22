const express = require('express')
const router = express.Router()
const CarsController = require('../controllers/CarsController')
const { imageUpload } = require('../helpers/ImageUploads')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, imageUpload.single('image'), CarsController.create)
router.post('/user', verifyToken, CarsController.getCarsByToken)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), CarsController.editCar)
router.delete('/:id', verifyToken, CarsController.deleteCar)
router.get('/:id', verifyToken, CarsController.getCarById)

module.exports = router
