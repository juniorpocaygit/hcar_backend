const express = require('express')
const router = express.Router()
const AssistanceController = require('../controllers/AssistanceController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')
const { imageUpload } = require('../helpers/ImageUploads')

router.post('/create', imageUpload.single('image'), verifyToken, AssistanceController.create)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), AssistanceController.editAssistance)
router.delete('/:id', verifyToken, AssistanceController.deleteAssistance)
router.get('/:id', verifyToken, AssistanceController.getAssistanceById)
router.post('/user', verifyToken, AssistanceController.getAssistanceByUser)

module.exports = router
