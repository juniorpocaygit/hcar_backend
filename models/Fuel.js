const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Cars = require('./Cars')

const Fuel = db.define('Fuel', {
    fuel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
    fuel_station: {
        type: DataTypes.STRING,
        require: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        require: false
    },
    liters: {
        type: DataTypes.DECIMAL(10,2),
        require: false
    },
})
Fuel.belongsTo(Cars)
Cars.hasMany(Fuel)

module.exports = Fuel