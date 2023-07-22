const Fuel = require('../models/Fuel')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class CarsValidations{

    static async fuelVal(req, res){
        const {fuel, date, price, liters, CarId} = req.body

        if(!fuel){
            res.status(422).json({message: 'Insira o tipo de combustível.'})
            return
        }
        if(!date){
            res.status(422).json({message: 'Insira a data do abastecimento.'})
            return
        }
        if(!price){
            res.status(422).json({message: 'Insira o valor total pago.'})
            return
        }
        if(!liters){
            res.status(422).json({message: 'Insira a quantidade em litros abastecida.'})
            return
        }
        if(!CarId){
            res.status(422).json({message: 'Veiculo relacionado não encontrado'})
            return
        }
               
        //check if user exists
        const token = getToken(req)  
        const user = await getUserByToken(token)

        if(!user){
            res.status(422).json({message: 'Token e usuário inválidos'})
            return user = null
        } else {
            return user
        }
    }

    static async verifyUserExists(req, res){
        
        //check if user exists
        const token = getToken(req)  
        const user = await getUserByToken(token)

        if(!user){
            res.status(422).json({message: 'Token e usuário inválidos'})
            return user = null
        } else {
            return user
        }
    }
}