require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const validations = require('../helpers/UserValidations')
const createUserToken = require('../helpers/CreateUserToken')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

const bcrypt = require('bcrypt')

module.exports = class UserController{

    static async register(req, res){
      
        //validations
        const reg = validations.registerVal(req, res)
        if (res.statusCode == 422) {
            return
        }  

        //check if user exists
        const check = await validations.registerCheckIfUserExistsVal(req, res) 
        if (check != null ) {
            return
        } 
        
        const {name, email, phone, password, level} = req.body
       
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
          await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
      
      //validations
      const reg = validations.loginVal(req, res)
      if (res.statusCode == 422) {
          return
      }  

      //check if user exists
      const User = await validations.loginCheckIfUserExistsVal(req, res) 
      if (User == null ) {
          return
      } 
      const {password} = req.body

      //check if password match with db password
      const checkPassword = await bcrypt.compare(password, User.password)
      if (!checkPassword) {
        res.status(422).json({
          message: 'Senha inválida!',
        })
        return
      }
      await createUserToken(User, req, res)

    }

    static async checkUser(req, res){
      let currentUser

      const secret = process.env.SECRET

      if(req.headers.authorization) {
        const token = getToken(req)
        const decoded = jwt.verify(token, secret)

        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        
      } else {
        currentUser = null
      }
      res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
      const id = req.params.id

      const user = await User.findOne({ where: { id: id }, attributes: { exclude: ['password'] }, })

      if (!user) {
        res.status(422).json({message: 'Usuário não encontrado.'})
        return
      }
      res.status(200).json({ user }) 
    }

    static async editUser(req, res){
      
      //check if user exists
      const token = getToken(req)  
      const user = await getUserByToken(token)

      //image upload
      let image = ''

      if(req.file){
        image = req.file.filename
      }
   
       //validations
       const update = validations.updateUserVal(req, res)
       if (res.statusCode == 422) {
           return
       } 

       const {name, email, phone} = req.body
       
        //create user update
        const userUpdate = {
          name,
          email,
          phone,
          photo: image
      }
      try {
        await User.update(userUpdate, {where: {id: user.id}})
        res.status(200).json({message: 'Usuário atualizado com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async forgot(req, res){
      const { email } = req.body

      const verifyEmail = validations.forgotCheckIfUserExistsVal(req, res)
      if (verifyEmail == null || res.statusCode == 422) {
        return
      }

      //create hash
      const salt = await bcrypt.genSaltSync(10)
      const hash = await bcrypt.hashSync(email, salt)

      //create time expired token
      const now = new Date()
      const addHours21 = 21 * 60 * 60 * 1000 
      const expireToken = new Date(now.getTime()+addHours21)

      //create user update
      const userUpdate = {
        recovery_token: hash,
        recovery_time: expireToken
      }

      try {
        await User.update(userUpdate, {where: {email: email}})
        res.status(200).json({message: 'Recuperação de senha criada com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }
    }

    static async resetpass(req, res){
      const recovery_token = req.params.tk
      const {email, password} = req.body

      const resetVal = validations.resetPasswordVal(req, res)
      if (resetVal == null || res.statusCode == 422) {
        return
      }

      //create a password
      const salt = await bcrypt.genSaltSync(12)
      const passwordHash = await bcrypt.hashSync(password, salt)

      //create user update
      const userUpdate = {
        password:passwordHash, 
        recovery_token: null,
        recovery_time:null
      }

      try {
        await User.update(userUpdate, {where: {email: email}})
        res.status(200).json({message: 'Redefinição de senha realiza com sucesso!'})
      } catch (err) {
        res.status(500).json({message: err})
      }




    }
}