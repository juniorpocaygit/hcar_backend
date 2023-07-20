require('dotenv').config()
const jwt = require('jsonwebtoken')
const getToken = require('./GetToken')

//middeleware to validate token
const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({message: 'Acesso Negado!'})
    }    
        
    const token = getToken(req)
    const secret = process.env.SECRET
    if(!token){
        return res.status(401).json({message: 'Acesso Negado!'})
    }

    try {
        const verified = jwt.verify(token, secret)
        req.user = verified
        next()
    } catch (err) {
        return res.status(400).json({message: 'Token inválido!'})
    }
}
module.exports = checkToken