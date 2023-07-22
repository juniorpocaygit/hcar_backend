const Taxes = require('../models/Taxes')
const TaxesPortion = require('../models/TaxesPortion')

const validations = require('../validations/TaxesValidations')


module.exports = class TaxesController{

    static async create(req, res){
     
        //validations
        const user = await validations.taxesVal(req, res)
        if (res.statusCode == 422 || user == null) {
            return
        }  

        const {taxe, portion, price, day_payment, details, CarId} = req.body
      
        //create safe object
        const taxeObj = {
            taxe,
            portion,
            details,
            CarId,
        }
        const newTaxe = await Taxes.create(taxeObj) 
    
        //create installment      
        if (portion != 1) {
            const valuePortion = price / portion
            let newTaxePortions = ""
            
            for (let i = 0; i < portion; i++) {
                const dataVencimento = new Date(day_payment);
                dataVencimento.setMonth(dataVencimento.getMonth() + i);

                const taxePortionsObj = {
                  name: "parcela "+(i+1),
                  day_payment: dataVencimento,
                  price: valuePortion,
                  TaxId: newTaxe.id,
                }
                newTaxePortions = await TaxesPortion.create(taxePortionsObj) 
            }
            res.status(200).json({message: `Imposto adicionado com sucesso!`, taxe: newTaxe, taxe_portions: newTaxePortions })
            return        
        } 
      
        const taxePortionsObj = {
          name: "parcela única",
          day_payment,
          price,
          TaxId: newTaxe.id,
        }
           
      try {
        const newTaxePortions = await TaxesPortion.create(taxePortionsObj) 
        res.status(200).json({message: `Imposto adicionado com sucesso!`, taxe: newTaxe, taxe_portions: newTaxePortions })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }
    
    static async getTaxesById(req, res){
      const id = req.params.id

      const taxe = await Taxes.findAll({ where: { id: id }, include: [{model: TaxesPortion}]})
      if (!taxe || taxe == '') {
        res.status(422).json({message: 'Imposto não encontrado.'})
        return
      }
      res.status(200).json({ taxe }) 
    }
   
    static async getTaxesByCar(req, res){
      const id = req.params.id

      const userCar = await validations.verifyUserCar(req, res)
      if (res.statusCode == 422 || userCar == null) {
        return
      }  
      const taxe = await Taxes.findAll({ where: { CarId: id }, include: [{model: TaxesPortion}]})

      if (!taxe || taxe == '') {
        res.status(422).json({message: 'Imposto não encontrado.'})
        return
      }
      res.status(200).json({ taxe }) 
    }

    static async editTaxes(req, res){
        const id = req.params.id 
        const {taxe, portion, price, day_payment, details, CarId} = req.body 
          
        //validations
        const user = await validations.taxesVal(req, res)
        if (res.statusCode == 422 || user == null) {
            return
        }
      
        const verifyUpdatePortions = await validations.verifyUpdatePortion(req)
        if (verifyUpdatePortions == 'update') {
            await TaxesPortion.destroy({where: {TaxId: id}})
            
            //create safe object
            const taxeObj = {
              taxe,
              portion,
              details,
              CarId,
            }
            const newTaxe = await Taxes.update(taxeObj, {where: {id: id}})

            if (portion != 1) {
                const valuePortion = price / portion
                let newTaxePortions = ''
                          
                for (let i = 0; i < portion; i++) {
                    const dataVencimento = new Date(day_payment);
                    dataVencimento.setMonth(dataVencimento.getMonth() + i);
        
                    const taxePortionsObj = {
                      name: "parcela "+(i+1),
                      day_payment: dataVencimento,
                      price: valuePortion,
                      TaxId: id,
                    }
                    newTaxePortions = await TaxesPortion.create(taxePortionsObj) 
                }
              res.status(200).json({message: `Imposto alterado com sucesso!`, taxe: newTaxe, taxe_portions: newTaxePortions })
              return        
          } 
        
          const taxePortionsObj = {
            name: "parcela única",
            day_payment,
            price,
            TaxId: id,
          }
          const newTaxePortions = await TaxesPortion.create(taxePortionsObj) 
          res.status(200).json({message: `Imposto alterado com sucesso!`, taxe: newTaxe, taxe_portions: newTaxePortions })
          return

        } else {
            //create safe object
            const taxeObj = {
              taxe,
              portion,
              details,
              CarId,
            }
            const newTaxe =  await Taxes.update(taxeObj, {where: {id: id}}) 

            const taxePortionsObj = {
                TaxId: id,
            }
            const taxePortion =  await TaxesPortion.update(taxePortionsObj, {where: {TaxId: id}}) 
            const taxesResult = await Taxes.findAll({ where: { id: id }, include: [{model: TaxesPortion}]})   
            res.status(200).json({message: `Imposto alterado com sucesso!`, taxe: taxesResult })
            return
        }
    }

    static async deleteTaxes(req, res){
      const id = req.params.id

      try {
        await TaxesPortion.destroy({where: {TaxId: id}})
        await Taxes.destroy({where: {id: id}})
        res.status(200).json({message: 'Imposto apagado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}