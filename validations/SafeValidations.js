const Safe = require('../models/Safe')
const SafePortion = require('../models/SafePortion')
const Cars = require('../models/Cars')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class SafeValidations{

    static async safeVal(req, res){
        const {company, contact, phone, next_renovation, price, portion, day_payment, details, franchise_value, CarId} = req.body

        if(!company){
            res.status(422).json({message: 'Insira a seguradora.'})
            return
        }
        if(!contact){
            res.status(422).json({message: 'Insira o contato da seguradora.'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'Insira o telefone da seguradora.'})
            return
        }
        if(!next_renovation){
            res.status(422).json({message: 'Insira a data da próxima renovação.'})
            return
        }
        if(!price){
            res.status(422).json({message: 'Insira o valor total do seguro'})
            return
        }
        if(!portion){
            res.status(422).json({message: 'Insira a quantidade de parcelas'})
            return
        }
        if(!day_payment){
            res.status(422).json({message: 'Insira a data do pagamento'})
            return
        }
        if(!CarId){
            res.status(422).json({message: 'Este seguro não esta relacionado a nenhum veículo'})
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

    static async verifyUserCar(req, res){
        const id = req.params.id

        //check if user exists
        const token = getToken(req)  
        const user = await getUserByToken(token)

        let car = await Cars.findOne({ where: { id: id }})
        if (!car) {
            res.status(422).json({message: 'Este veiculo não existe.'})
            return car = null
        }

        if (car.userId != user.id) {
            res.status(422).json({message: 'Este veículo não pertence a este usuário.'})
            return car = null
        }

        return car
    }

    static async verifyUpdatePortion(req){
        const id = req.params.id
        const {price, day_payment, portion} = req.body

        const safe = await SafePortion.findAndCountAll({ where: { SafeId: id }})

        const dateReq = new Date(day_payment)
        const dateBd = new Date(safe.rows[0].day_payment)
        const priceBd = safe.rows[0].price * safe.count
        const portionsBd = safe.count
        let validation = ''

       if (price != priceBd || dateReq != dateBd || portion != portionsBd) {
            return validation = 'update'
       } else {
        return validation = null
       }
    }
}