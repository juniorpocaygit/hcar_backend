const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')
const { imageUpload } = require('../helpers/ImageUploads')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/forgot', UserController.forgot)
router.post('/resetpass/:tk', UserController.resetpass)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser)


module.exports = router
