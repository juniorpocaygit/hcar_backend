const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Cars = require('./Cars')

const Taxes = db.define('Taxes', {
    taxe: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    portion: {
        type: DataTypes.INTEGER,
        require: false
    },
    details: {
        type: DataTypes.STRING,
        require: false
    },
})
Taxes.belongsTo(Cars)
Cars.hasMany(Taxes)

module.exports = Taxes