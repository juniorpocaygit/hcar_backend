require('dotenv').config()
const jwt = require('jsonwebtoken')

const User = require("../models/User")

//get user by jwt token
const getUserByToken = async(token) =>{
    if(!token){
        return res.status(401).json({message: 'Acesso Negado!'})
    }
    const secret = process.env.SECRET
    
    const decoded =jwt.verify(token, secret)

    const userId = decoded.id

    const user = await User.findOne({where:{id: userId}})

    return user
}
module.exports = getUserByToken