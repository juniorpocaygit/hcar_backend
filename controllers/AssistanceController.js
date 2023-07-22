require('dotenv').config()
const Assistance = require('../models/Assistance')
const AssistanceAddress = require('../models/AssistanceAddress')

const validations = require('../validations/AssistanceValidations')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class AssistanceController{

    static async create(req, res){
      
      //validations
      const user = await validations.assistanceVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      } 
      
      //image upload
      let image = ''

      if(req.file){
        image = req.file.filename
      }

      const {name, contact, phone, whatsapp, specialty, address,number, complement, district, city, state, cep} = req.body
      
      //create assistance object
      const assistanceObj = {
          name,
          contact,
          phone,
          whatsapp,
          specialty,
          photo: image,
          userId: user.id,
      }
      const newAssistance = await Assistance.create(assistanceObj) 
      
      //create assistance address object
      const assistanceAddressObj = {
          address,
          number,
          complement,
          district,
          city,
          state,
          cep,
          AssistanceId: newAssistance.id
      }
      
      try {
        const newAssistanceAddress = await AssistanceAddress.create(assistanceAddressObj) 
        res.status(200).json({message: `Oficina adicionada com sucesso!`, assistance: newAssistance, assistance_address: newAssistanceAddress  })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }

    static async getAssistanceById(req, res){
      const id = req.params.id

      const assistance = await Assistance.findAll({ where: { id: id }, include: [{model: AssistanceAddress}]})
      
      if (!assistance) {
        res.status(422).json({message: 'Oficina não encontrada.'})
        return
      }
      res.status(200).json({ assistance }) 
    }
   
    static async getAssistanceByUser(req, res){

      //get user by token
      const token = getToken(req)  
      const user = await getUserByToken(token)

      const assistance = await Assistance.findAll({ where: { userId: user.id }, include: [{model: AssistanceAddress}]})

      if (!assistance) {
        res.status(422).json({message: 'Oficina não encontrada.'})
        return
      }
      res.status(200).json({ assistance }) 
    }

    static async editAssistance(req, res){
      const id = req.params.id  
          
      //validations
      const user = await validations.assistanceVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      const assistance = await validations.verifyUserAssistance(req, res)
      if (res.statusCode == 422 || assistance == null) {
          return
      }
      
      //image upload
      let image = ''

      if(req.file){
        image = req.file.filename
      }

      const {name, contact, phone, whatsapp, specialty, address,number, complement, district, city, state, cep} = req.body
      
      //create assistance object
      const assistanceObj = {
          name,
          contact,
          phone,
          whatsapp,
          specialty,
          photo: image,
       }
     
      //create assistance address object
      const assistanceAddressObj = {
          address,
          number,
          complement,
          district,
          city,
          state,
          cep,
      }
      
      try {
        await Assistance.update(assistanceObj, {where: {id: id}})
        await AssistanceAddress.update(assistanceAddressObj, {where: {AssistanceId: id}})
        res.status(200).json({message: 'Oficina atualizado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async deleteAssistance(req, res){
      const id = req.params.id

      const assistance = await validations.verifyUserAssistance(req, res)
      if (res.statusCode == 422 || assistance == null) {
          return
      }

      try {
        await AssistanceAddress.destroy({where: {AssistanceId: id}})
        await Assistance.destroy({where: {id: id}})
        res.status(200).json({message: 'Oficina apagada com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}