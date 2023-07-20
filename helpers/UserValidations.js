const User = require('../models/User')

module.exports = class UserValidations{

    static registerVal(req, res){
        const {name, email, phone, password, confirmpassword, level} = req.body
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório.'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório.'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório.'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória.'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória.'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais.'})
            return
        }
        if(!level){
            res.status(422).json({message: 'O nível de usuário é obrigatório.'})
            return
        }
    }

    static updateUserVal(req, res){
        const {name, email, phone} = req.body
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório.'})
            return
        }
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório.'})
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório.'})
            return
        }
    }

    static async registerCheckIfUserExistsVal(req, res){
        const {email} = req.body
        let userExists = await User.findOne({where:{email: email}})
        if(userExists){
            res.status(422).json({message: 'Por favor utilze outro email.'})
            return userExists
        } else {
            return userExists = null
        }
    }

    static async loginCheckIfUserExistsVal(req, res){
        const {email} = req.body
        let userExists = await User.findOne({where:{email: email}})
        if(!userExists){
            res.status(422).json({message: 'Não há usuário cadastrado com este email'})
            return userExists = null
        } else {
            return userExists
        }
    }

    static loginVal(req, res){
        const {email, password} = req.body
       
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório.'})
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória.'})
            return
        }
    }

    static async forgotCheckIfUserExistsVal(req, res){
        const {email} = req.body

        if (!email) {
            res.status(422).json({message: 'O e-mail é obrigatório.'})
            return
        }

        let userExists = await User.findOne({where:{email: email}})
        
        if(!userExists){
            res.status(422).json({message: 'Não há usuário cadastrado com este email.'})
            return userExists = null
        } else {
            return userExists
        }
    }

    static async resetPasswordVal(req, res){
        const tk = req.params.tk
        
        const {email, password, confirmpassword} = req.body

        if (!tk) {
            res.status(422).json({message: 'Token inválido.'})
            return
        }
        if (!email) {
            res.status(422).json({message: 'O e-mail é obrigatório.'})
            return
        }
        if (!password) {
            res.status(422).json({message: 'A senha é obrigatória.'})
            return
        }
        if (!confirmpassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatória.'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais.'})
            return
        }
        
        let userExists = await User.findOne({where:{email: email}})
        console.log(userExists)
        console.log(`TK: ${tk}`)
        console.log(`USER: ${userExists.recovery_token}`)

        if (userExists && tk != userExists.recovery_token) {
            res.status(422).json({message: 'Token inválido2.'})
            return
        }

        //check token expiration date 
        const dateNow = new Date()
        
        if (userExists && userExists.recovery_time.getTime() < dateNow.getTime()) {
            res.status(422).json({message: 'Token expirado, faça novamente a recuperação de senha!'})
            return
        }

        if(!userExists){
            res.status(422).json({message: 'Não há usuário cadastrado com este email.'})
            return userExists = null
        } else {
            return userExists
        }
    }
}