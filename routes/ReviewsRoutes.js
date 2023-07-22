const express = require('express')
const router = express.Router()
const ReviewsController = require('../controllers/ReviewsController')

//middlewares
const verifyToken = require('../helpers/VerifyToken')

router.post('/create', verifyToken, ReviewsController.create)
router.patch('/edit/:id', verifyToken, ReviewsController.editReview)
router.delete('/:id', verifyToken, ReviewsController.deleteReview)
router.get('/:id', verifyToken, ReviewsController.getReviewById)
router.get('/car/:id', verifyToken, ReviewsController.getReviewByCar)

module.exports = router
