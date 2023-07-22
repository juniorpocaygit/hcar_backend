const Maintenance = require('../models/Maintenance')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class MaintenanceValidations{

    static async maintenanceVal(req, res){
        const {maintenance, assistance, date, price, next_maintenance, done, details, CarId} = req.body

        if(!maintenance){
            res.status(422).json({message: 'Insira a manutenção realizada.'})
            return
        }
        if(!assistance){
            res.status(422).json({message: 'Selecione ou cadastre primeiramente uma mecânica.'})
            return
        }
        if(!date){
            res.status(422).json({message: 'Insira a data da manutenção.'})
            return
        }
        if(!price){
            res.status(422).json({message: 'Insira o valor da manutenção.'})
            return
        }
        if(!CarId){
            res.status(422).json({message: 'Relacione esta manutenção a algum veículo.'})
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