const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./User')

const Assistance = db.define('Assistance', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    phone: {
        type: DataTypes.STRING,
        require: false
    },
    whatsapp: {
        type: DataTypes.STRING,
        require: false
    },
    specialty: {
        type: DataTypes.TEXT,
        require: true
    },
    photo: {
        type: DataTypes.STRING,
        require: false
    },
})
Assistance.belongsTo(User)
User.hasMany(Assistance)

module.exports = Assistance