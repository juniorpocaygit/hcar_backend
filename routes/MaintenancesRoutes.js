const express = require('express')
const router = express.Router()
const MaintenancesController = require('../controllers/MaintenancesController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, MaintenancesController.create)
router.patch('/edit/:id', verifyToken, MaintenancesController.editMaintenance)
router.delete('/:id', verifyToken, MaintenancesController.deleteMaintenance)
router.get('/:id', verifyToken, MaintenancesController.getMaintenanceById)
router.get('/car/:id', verifyToken, MaintenancesController.getMaintenanceByCar)

module.exports = router
