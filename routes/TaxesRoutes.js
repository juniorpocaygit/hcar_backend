const express = require('express')
const router = express.Router()
const TaxesController = require('../controllers/TaxesController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, TaxesController.create)
router.patch('/edit/:id', verifyToken, TaxesController.editTaxes)
router.delete('/:id', verifyToken, TaxesController.deleteTaxes)
router.get('/:id', verifyToken, TaxesController.getTaxesById)
router.get('/car/:id', verifyToken, TaxesController.getTaxesByCar)

module.exports = router
