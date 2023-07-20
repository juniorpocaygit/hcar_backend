require('dotenv').config()
const UserAddress = require('../models/UserAddress')
const jwt = require('jsonwebtoken')

const validations = require('../helpers/AddressValidations')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class UserAddressController{

    static async create(req, res){
      
      //validations
      const user = await validations.addressVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }  

      const {title, address, number, complement, district, city, state, cep} = req.body
      
      //create userAddress
      const userAddress = {
          title,
          address,
          number,
          complement,
          district,
          city,
          state,
          cep,
          userId: user.id
      }
      
      try {
        const newUserAddress = await UserAddress.create(userAddress) 
        res.status(200).json({message: `Endereço de ${user.name} adicionado com sucesso!`, newUserAddress: newUserAddress })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }

    static async getAddressById(req, res){
      const id = req.params.id

      const address = await UserAddress.findOne({ where: { id: id }})

      if (!address) {
        res.status(422).json({message: 'Endereço não encontrado.'})
        return
      }
      res.status(200).json({ address }) 
    }

    static async getAddressByToken(req, res){

      //check if user exists
      const token = getToken(req)  
      const user = await getUserByToken(token)

      const address = await UserAddress.findAll({ where: { userId: user.id }})

      if (!address) {
        res.status(422).json({message: 'Endereços não encontrado.'})
        return
      }
      res.status(200).json({ address }) 
    }

    static async editAddress(req, res){
      const id = req.params.id  

      //validations
      const user = await validations.addressVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }
      
      const addressByUser = await validations.verifyAddressUser(req, res)
      if (res.statusCode == 422 || addressByUser == null) {
          return
      }
     
      const {title, address, number, complement, district, city, state, cep} = req.body
      
      //create userAddress
      const userAddress = {
          title,
          address,
          number,
          complement,
          district,
          city,
          state,
          cep,
          userId: user.id
      }

      try {
        await UserAddress.update(userAddress, {where: {id: id}})
        res.status(200).json({message: 'Endereço atualizado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async deleteAddress(req, res){
      const id = req.params.id

      const addressByUser = await validations.verifyAddressUser(req, res)
      if (res.statusCode == 422 || addressByUser == null) {
          return
      }

      try {
        await UserAddress.destroy({where: {id: id}})
        res.status(200).json({message: 'Endereço apagado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}