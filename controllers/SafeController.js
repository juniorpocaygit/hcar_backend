const Safe = require('../models/Safe')
const SafePortion = require('../models/SafePortion')

const validations = require('../validations/SafeValidations')


module.exports = class SafeController{

    static async create(req, res){
     
        //validations
        const user = await validations.safeVal(req, res)
        if (res.statusCode == 422 || user == null) {
            return
        }  

        const {company, contact, phone, next_renovation, price, day_payment, portion, details, franchise_value, CarId} = req.body
      
        //create safe object
        const safeObj = {
            company,
            contact,
            phone,
            next_renovation,
            portion,
            details,
            franchise_value,
            CarId,
        }
     
        const newSafe = await Safe.create(safeObj) 

        //create installment      
        if (portion != 1) {
            const valuePortion = price / portion
            let newSafePortions = ""
            
            for (let i = 0; i < portion; i++) {
                const dataVencimento = new Date(day_payment);
                dataVencimento.setMonth(dataVencimento.getMonth() + i);

                const safePortionsObj = {
                  name: "parcela "+(i+1),
                  day_payment: dataVencimento,
                  price: valuePortion,
                  SafeId: newSafe.id,
                }
                newSafePortions = await SafePortion.create(safePortionsObj) 
            }
            res.status(200).json({message: `Seguro adicionado com sucesso!`, safe: newSafe, safe_portions: newSafePortions })
            return        
        } 
      
        const safePortionsObj = {
          name: "parcela única",
          day_payment,
          price,
          SafeId: newSafe.id,
        }
           
      try {
        const newSafePortions = await SafePortion.create(safePortionsObj) 
        res.status(200).json({message: `Seguro adicionado com sucesso!`, safe: newSafe, safe_portions: newSafePortions })
      } catch (error) {
          res.status(500).json({message: error})
      }
    }
    
    static async getSafeById(req, res){
      const id = req.params.id

      const safe = await Safe.findAll({ where: { id: id }, include: [{model: SafePortion}]})
      if (!safe || safe == '') {
        res.status(422).json({message: 'Seguro não encontrado.'})
        return
      }
      res.status(200).json({ safe }) 
    }
   
    static async getSafeByCar(req, res){
      const id = req.params.id

      const userCar = await validations.verifyUserCar(req, res)
      if (res.statusCode == 422 || userCar == null) {
        return
      }  
      const safe = await Safe.findAll({ where: { CarId: id }, include: [{model: SafePortion}]})

      if (!safe || safe == '') {
        res.status(422).json({message: 'Seguro não encontrado.'})
        return
      }
      res.status(200).json({ safe }) 
    }

    static async editSafe(req, res){
        const id = req.params.id 
        const {company, contact, phone, next_renovation, price, day_payment, portion, details, franchise_value, CarId} = req.body       
          
        //validations
        const user = await validations.safeVal(req, res)
        if (res.statusCode == 422 || user == null) {
            return
        }
      
        const verifyUpdatePortions = await validations.verifyUpdatePortion(req)
        if (verifyUpdatePortions == 'update') {
            await SafePortion.destroy({where: {SafeId: id}})
            
            //create safe object
            const safeObj = {
                company,
                contact,
                phone,
                next_renovation,
                portion,
                details,
                franchise_value,
                CarId,
            }
            const newSafe = await Safe.update(safeObj, {where: {id: id}})

            if (portion != 1) {
                const valuePortion = price / portion
                let newSafePortions = ''
                          
                for (let i = 0; i < portion; i++) {
                    const dataVencimento = new Date(day_payment);
                    dataVencimento.setMonth(dataVencimento.getMonth() + i);
        
                    const safePortionsObj = {
                      name: "parcela "+(i+1),
                      day_payment: dataVencimento,
                      price: valuePortion,
                      SafeId: id,
                    }
                    newSafePortions = await SafePortion.create(safePortionsObj) 
                }
              res.status(200).json({message: `Seguro adicionado com sucesso!`, safe: newSafe, safe_portions: newSafePortions })
              return        
          } 
        
          const safePortionsObj = {
            name: "parcela única",
            day_payment,
            price,
            SafeId: id,
          }
          const newSafePortions = await SafePortion.create(safePortionsObj) 
          res.status(200).json({message: `Seguro adicionado com sucesso!`, safe: newSafe, safe_portions: newSafePortions })
          return

        } else {
            //create safe object
            const safeObj = {
              company,
              contact,
              phone,
              next_renovation,
              portion,
              details,
              franchise_value,
              CarId,
            }
            const newSafe =  await Safe.update(safeObj, {where: {id: id}}) 

            const safePortionsObj = {
                SafeId: id,
            }
            const newSafePortions =  await SafePortion.update(safePortionsObj, {where: {SafeId: id}}) 
            const safeResult = await Safe.findAll({ where: { id: id }, include: [{model: SafePortion}]})   
            res.status(200).json({message: `Seguro adicionado com sucesso!`, safe: safeResult })
            return
        }
    }

    static async deleteSafe(req, res){
      const id = req.params.id

      try {
        await SafePortion.destroy({where: {SafeId: id}})
        await Safe.destroy({where: {id: id}})
        res.status(200).json({message: 'Seguro apagado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

  
}