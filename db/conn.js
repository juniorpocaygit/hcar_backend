require('dotenv').config()
const {Sequelize} = require('sequelize')

const database = process.env.DATABASE
const user = process.env.USER
const password = process.env.PASS
const host = process.env.HOST


const sequelize = new Sequelize(database, user, password,{
    host: host,
    dialect: 'mysql', 
})

try {
    sequelize.authenticate()
    console.log('Conectado com sucesso!')
} catch (err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize