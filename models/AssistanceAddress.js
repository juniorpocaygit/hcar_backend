const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Assistance = require('./Assistance')

const AssistanceAddress = db.define('Assistance_address', {
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

AssistanceAddress.belongsTo(Assistance)
Assistance.hasMany(AssistanceAddress)

module.exports = AssistanceAddress