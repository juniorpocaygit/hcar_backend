const User = require('../models/User')

const bcrypt = require('bcrypt')

module.exports = class UserController{

    static async register(req, res){
        const {name, email, phone, password, confirmpassword, level} = req.body

        //validations
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
            res.status(422).json({message: 'A senha é obrigatório.'})
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatório.'})
            return
        }
        if(password !== confirmpassword){
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais.'})
            return
        }

        //check if user exists
        const userExists = await User.findOne({where:{email: email}})
        
        if(userExists){
            res.status(422).json({message: 'Por favor utilize outro e-mail .'})
            return
        }

        //create a password
        const salt = await bcrypt.genSaltSync(12)
        const passwordHash = await bcrypt.hashSync(password, salt)
      

        //create user
        const user = {
            name,
            email,
            phone,
            password: passwordHash,
            level,
        }
        try {
          const newUser = await User.create(user) 
          res.status(201).json({message: `Usuário ${newUser.name} criado com sucesso!`}),
          newUser.name
        } catch (error) {
          res.status(500).json({message: error})
        }
    }


}