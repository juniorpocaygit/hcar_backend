const express = require('express')
const router = express.Router()
const SafeController = require('../controllers/SafeController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, SafeController.create)
router.patch('/edit/:id', verifyToken, SafeController.editSafe)
router.delete('/:id', verifyToken, SafeController.deleteSafe)
router.get('/:id', verifyToken, SafeController.getSafeById)
router.get('/car/:id', verifyToken, SafeController.getSafeByCar)

module.exports = router
