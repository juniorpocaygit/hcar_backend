const Assistance = require('../models/Assistance')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class AssistanceValidations{

    static async assistanceVal(req, res){
        const {name, contact, phone, address,number, district, city, state, cep} = req.body

        if(!name){
            res.status(422).json({message: 'Insira o nome da oficina.'})
            return
        }
        if(!contact){
            res.status(422).json({message: 'Insira o nome do contato.'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'Insira o telefone de contato.'})
            return
        }
        if(!address){
            res.status(422).json({message: 'Insira o endereço da oficina.'})
            return
        }
        if(!number){
            res.status(422).json({message: 'Insira o número da oficina'})
            return
        }
        if(!district){
            res.status(422).json({message: 'Insira o bairro da oficina'})
            return
        }
        if(!city){
            res.status(422).json({message: 'Insira a cidade da oficina'})
            return
        }
        if(!state){
            res.status(422).json({message: 'Insira o estado da oficina'})
            return
        }
        if(!cep){
            res.status(422).json({message: 'Insira o cep da oficina'})
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

    static async verifyUserAssistance(req, res){
        const id = req.params.id

        //check if user exists
        const token = getToken(req)  
        const user = await getUserByToken(token)

        let assistance = await Assistance.findOne({ where: { id: id }})
        if (!assistance) {
            res.status(422).json({message: 'Esta oficina não existe.'})
            return assistance = null
        }

        if (assistance.userId != user.id) {
            res.status(422).json({message: 'Esta oficina não pertence a este usuário.'})
            return assistance = null
        }

        return assistance
    }
}