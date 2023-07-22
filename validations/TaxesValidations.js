const Taxes = require('../models/Taxes')
const TaxesPortion = require('../models/TaxesPortion')
const Cars = require('../models/Cars')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class TaxesValidations{

    static async taxesVal(req, res){
        const {taxe, portion, price, day_payment, details, CarId} = req.body

        if(!taxe){
            res.status(422).json({message: 'Insira o imposto.'})
            return
        }
        if(!portion){
            res.status(422).json({message: 'Insira a quantidade de parcelas.'})
            return
        }
        if(!price){
            res.status(422).json({message: 'Insira o valor do imposto.'})
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

        const taxe = await TaxesPortion.findAndCountAll({ where: { TaxId: id }})

        const dateReq = new Date(day_payment)
        const dateBd = new Date(taxe.rows[0].day_payment)
        const priceBd = taxe.rows[0].price * taxe.count
        const portionsBd = taxe.count
        let validation = ''

       if (price != priceBd || dateReq != dateBd || portion != portionsBd) {
            return validation = 'update'
       } else {
            return validation = null
       }
    }
}