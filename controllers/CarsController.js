require('dotenv').config()
const Cars = require('../models/Cars')

const validations = require('../validations/CarsValidations')
const createUserToken = require('../helpers/CreateUserToken')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class CarsController{

    static async create(req, res){
      
      //validations
      const user = await validations.carsVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }  

      //image upload
      let image = ''

      if(req.file){
        image = req.file.filename
      }

      const {name, odometer, plate, brand, year, model, motor, color, price} = req.body
      
      //create userAddress
      const userCar = {
          name,
          odometer,
          plate,
          brand,
          year,
          model,
          motor,
          color,
          price,
          photo: image,
          userId: user.id
      }
      
      try {
        const newCar = await Cars.create(userCar) 
        res.status(200).json({message: `Veículo adicionado com sucesso!`, newVehicle: newCar })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }

    static async getCarById(req, res){
      const id = req.params.id

      const car = await Cars.findOne({ where: { id: id }})

      if (!car) {
        res.status(422).json({message: 'Endereço não encontrado.'})
        return
      }
      res.status(200).json({ car }) 
    }

    static async getCarsByToken(req, res){

      //check if user exists
      const token = getToken(req)  
      const user = await getUserByToken(token)

      const car = await Cars.findAll({ where: { userId: user.id }})

      if (!car) {
        res.status(422).json({message: 'Veiculo não encontrado.'})
        return
      }
      res.status(200).json({ car }) 
    }

    static async editCar(req, res){
      const id = req.params.id  
          
      //validations
      const user = await validations.carsVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }
      
      const carByUser = await validations.verifyCarUser(req, res)
      if (res.statusCode == 422 || carByUser == null) {
          return
      }
     
      //image upload
      let image = ''

      if(req.file){
        image = req.file.filename
      }
 
      const {name, odometer, plate, brand, year, model, motor, color, price} = req.body
      
      //create userAddress
      const userCar = {
          name,
          odometer,
          plate,
          brand,
          year,
          model,
          motor,
          color,
          price,
          photo: image,
          userId: user.id
      }
      try {
        await Cars.update(userCar, {where: {id: id}})
        res.status(200).json({message: 'Veiculo atualizado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async deleteCar(req, res){
      const id = req.params.id

      const carByUser = await validations.verifyCarUser(req, res)
      if (res.statusCode == 422 || carByUser == null) {
          return
      }

      try {
        await Cars.destroy({where: {id: id}})
        res.status(200).json({message: 'Veiculo apagado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}