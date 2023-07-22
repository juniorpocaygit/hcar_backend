const Review = require('../models/Reviews')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class ReviewsValidations{

    static async reviewVal(req, res){
        const {review, date, price, details, next_review, km_next_review, CarId} = req.body

        if(!review){
            res.status(422).json({message: 'Insira o nome da revisão.'})
            return
        }
        if(!date){
            res.status(422).json({message: 'Insira a data da revisão.'})
            return
        }
        if(!price){
            res.status(422).json({message: 'Insira o valor da revisão.'})
            return
        }
        if(!km_next_review){
            res.status(422).json({message: 'Insira a kilometragem da próxima revisão.'})
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