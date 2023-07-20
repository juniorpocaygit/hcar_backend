const UserAddress = require('../models/UserAddress')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class AddressValidations{

    static async addressVal(req, res){
        const {title, address, number, complement, district, city, state, cep} = req.body

        if(!title){
            res.status(422).json({message: 'O título do endereço é obrigatório.'})
            return
        }
        if(!address){
            res.status(422).json({message: 'O endereço é obrigatório.'})
            return
        }
        if(!number){
            res.status(422).json({message: 'O número do endereço é obrigatório.'})
            return
        }
        if(!district){
            res.status(422).json({message: 'O bairro é obrigatório.'})
            return
        }
        if(!city){
            res.status(422).json({message: 'A cidade é obrigatória.'})
            return
        }
        if(!state){
            res.status(422).json({message: 'O estado é obrigatório.'})
            return
        }
        if(!cep){
            res.status(422).json({message: 'O cep é obrigatório.'})
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

    static async verifyAddressUser(req, res){
        const id = req.params.id

        //check if user exists
        const token = getToken(req)  
        const user = await getUserByToken(token)

        let address = await UserAddress.findOne({ where: { id: id }})
        if (!address) {
            res.status(422).json({message: 'Este endereço não existe.'})
            return address = null
        }

        if (address.userId != user.id) {
            res.status(422).json({message: 'Este endereço não pertence a este usuário.'})
            return address = null
        }

        return address
    }



}