const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Safe = require('./Safe')

const SafePortion = db.define('SafePortion', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    day_payment: {
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        require: true
    },
 })
SafePortion.belongsTo(Safe)
Safe.hasMany(SafePortion)

module.exports = SafePortion