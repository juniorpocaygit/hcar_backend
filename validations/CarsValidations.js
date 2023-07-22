const Cars = require('../models/Cars')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class CarsValidations{

    static async carsVal(req, res){
        const {name, odometer, plate, brand, year, model, motor, color} = req.body

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório.'})
            return
        }
        if(!odometer){
            res.status(422).json({message: 'A kilometragem é obrigatória.'})
            return
        }
        if(!plate){
            res.status(422).json({message: 'A placa é obrigatória.'})
            return
        }
        if(!brand){
            res.status(422).json({message: 'A marce é obrigatória.'})
            return
        }
        if(!year){
            res.status(422).json({message: 'O ano de fabricação e obrigatório.'})
            return
        }
        if(!model){
            res.status(422).json({message: 'O modelo é obrigatório.'})
            return
        }
        if(!motor){
            res.status(422).json({message: 'Informe o motor do carro.'})
            return
        }
        if(!color){
            res.status(422).json({message: 'A cor é obrigatória.'})
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

    static async verifyCarUser(req, res){
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



}