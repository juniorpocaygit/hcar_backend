const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./User')

const Car = db.define('Car', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    odometer: {
        type: DataTypes.DECIMAL(6,3),
        allowNull: false,
        require: true
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
    model: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
    motor: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    color: {
        type: DataTypes.STRING,
        require: false
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        require: false
    },
    photo: {
        type: DataTypes.STRING,
        require: false
    },

})
Car.belongsTo(User)
User.hasMany(Car)

module.exports = Car