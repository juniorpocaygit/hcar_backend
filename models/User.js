const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    phone: {
        type: DataTypes.STRING,
        require: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },   
    photo: {
        type: DataTypes.STRING,
        require: false
    },   
    level: {
        type: DataTypes.INTEGER,
        require: false
    },   
})
module.exports = User