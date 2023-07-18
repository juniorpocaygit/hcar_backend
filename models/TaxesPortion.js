const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Taxes = require('./Taxes')

const TaxesPortion = db.define('TaxesPortion', {
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
TaxesPortion.belongsTo(Taxes)
Taxes.hasMany(TaxesPortion)

module.exports = TaxesPortion