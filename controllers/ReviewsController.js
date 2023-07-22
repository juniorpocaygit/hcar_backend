const Reviews = require('../models/Reviews')
const Review = require('../models/Reviews')

const validations = require('../validations/ReviewsValidations')


module.exports = class ReviewsController{

    static async create(req, res){
      
      //validations
      const user = await validations.reviewVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }  

      const {review, date, price, details, next_review, km_next_review, done, CarId} = req.body
      
      //create userAddress
      const reviewObj = {
          review,
          date,
          price,
          details,
          next_review,
          km_next_review,
          done,
          CarId,
      }
      
      try {
        const newReview = await Review.create(reviewObj) 
        res.status(200).json({message: `Revisão adicionada com sucesso!`, review: newReview })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }

    static async getReviewById(req, res){
      const id = req.params.id

      const review = await Reviews.findOne({ where: { id: id }})

      if (!review) {
        res.status(422).json({message: 'Revisão não encontrada.'})
        return
      }
      res.status(200).json({ review }) 
    }
   
    static async getReviewByCar(req, res){
      const id = req.params.id

      const review = await Reviews.findAll({ where: { CarId: id }})

      if (!review) {
        res.status(422).json({message: 'Revisão não encontrada.'})
        return
      }
      res.status(200).json({ review }) 
    }

    static async editReview(req, res){
      const id = req.params.id  
          
      //validations
      const user = await validations.reviewVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      const {review, date, price, details, next_review, km_next_review, done, CarId} = req.body
      
      //create userAddress
      const reviewObj = {
          review,
          date,
          price,
          details,
          next_review,
          km_next_review,
          done,
          CarId,
      }
      
      try {
        await Reviews.update(reviewObj, {where: {id: id}})
        res.status(200).json({message: 'Revisão atualizada com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async deleteReview(req, res){
      const id = req.params.id

      const user = await validations.verifyUserExists(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      try {
        await Reviews.destroy({where: {id: id}})
        res.status(200).json({message: 'Revisão apagada com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}