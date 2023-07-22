
const Maintenance = require('../models/Maintenance')

const validations = require('../validations/MaintenancesValidations')

module.exports = class MaintenancesController{

    static async create(req, res){
      
      //validations
      const user = await validations.maintenanceVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }  

      const {maintenance, assistance, date, price, next_maintenance, done, details, CarId} = req.body
      
      //create userAddress
      const maintenanceObj = {
          maintenance,
          assistance,
          date,
          price,
          next_maintenance,
          done,
          details,
          CarId,
      }
      
      try {
        const newMaintenance = await Maintenance.create(maintenanceObj) 
        res.status(200).json({message: `Manutenção adicionada com sucesso!`, maintenance: newMaintenance })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }

    static async getMaintenanceById(req, res){
      const id = req.params.id

      const maintenance = await Maintenance.findOne({ where: { id: id }})

      if (!maintenance) {
        res.status(422).json({message: 'Manutenção não encontrada.'})
        return
      }
      res.status(200).json({ maintenance }) 
    }
   
    static async getMaintenanceByCar(req, res){
      const id = req.params.id

      const maintenance = await Maintenance.findAll({ where: { CarId: id }})

      if (!maintenance) {
        res.status(422).json({message: 'Abastecimento não encontrado.'})
        return
      }
      res.status(200).json({ maintenance }) 
    }

    static async editMaintenance(req, res){
      const id = req.params.id  
          
      //validations
      const user = await validations.maintenanceVal(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      const {maintenance, assistance, date, price, next_maintenance, done, details, CarId} = req.body
      
      //create maintenance
      const maintenanceObj = {
          maintenance,
          assistance,
          date,
          price,
          next_maintenance,
          done,
          details,
          CarId,
      }
      
      try {
        await Maintenance.update(maintenanceObj, {where: {id: id}})
        res.status(200).json({message: 'Manutenção atualizada com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async deleteMaintenance(req, res){
      const id = req.params.id

      const user = await validations.verifyUserExists(req, res)
      if (res.statusCode == 422 || user == null) {
          return
      }

      try {
        await Maintenance.destroy({where: {id: id}})
        res.status(200).json({message: 'Manutenção apagada com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }
}