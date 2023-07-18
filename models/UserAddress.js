const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./User')

const UserAddress = db.define('User_address', {
    address: {
        type: DataTypes.STRING,
        require: false
    },
    number: {
        type: DataTypes.STRING,
        require: false
    },
    complement: {
        type: DataTypes.STRING,
        require: false
    },
    district: {
        type: DataTypes.STRING,
        require: false
    },
    city: {
        type: DataTypes.STRING,
        require: false
    },
    state: {
        type: DataTypes.STRING,
        require: false
    },
    cep: {
        type: DataTypes.STRING,
        require: false
    },

})

UserAddress.belongsTo(User)
User.hasMany(UserAddress)

module.exports = UserAddress