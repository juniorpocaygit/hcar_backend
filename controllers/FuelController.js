require('dotenv').config()
const Fuel = require('../models/Fuel')

const validations = require('../validations/FuelValidations')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class FuelController{

    static async create(req, res){
      
      //validations
      const user = await validations.fuelVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }  

      const {fuel, fuel_station, date, price, liters, CarId} = req.body
      
      //create userAddress
      const fuelObj = {
          fuel,
          fuel_station,
          date,
          price,
          liters,
          CarId,
      }
      
      try {
        const newFuel = await Fuel.create(fuelObj) 
        res.status(200).json({message: `Abastecimento adicionado com sucesso!`, fuel: newFuel })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }

    static async getFuelById(req, res){
      const id = req.params.id

      const fuel = await Fuel.findOne({ where: { id: id }})

      if (!fuel) {
        res.status(422).json({message: 'Abastecimento não encontrado.'})
        return
      }
      res.status(200).json({ fuel }) 
    }
   
    static async getFuelByCar(req, res){
      const id = req.params.id

      const fuel = await Fuel.findAll({ where: { CarId: id }})

      if (!fuel) {
        res.status(422).json({message: 'Abastecimento não encontrado.'})
        return
      }
      res.status(200).json({ fuel }) 
    }

    static async editFuel(req, res){
      const id = req.params.id  
          
      //validations
      const user = await validations.fuelVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      const {fuel, fuel_station, date, price, liters, CarId} = req.body
      
      //create userAddress
      const fuelObj = {
          fuel,
          fuel_station,
          date,
          price,
          liters,
          CarId,
      }
      
      try {
        await Fuel.update(fuelObj, {where: {id: id}})
        res.status(200).json({message: 'Abastecimento atualizado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async deleteFuel(req, res){
      const id = req.params.id

      const user = await validations.verifyUserExists(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      try {
        await Fuel.destroy({where: {id: id}})
        res.status(200).json({message: 'Abastecimento apagado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}