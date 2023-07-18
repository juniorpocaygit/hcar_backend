const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Cars = require('./Cars')

const Safe = db.define('Safe', {
    company: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    contact: {
        type: DataTypes.STRING,
        require: false
    },
    phone: {
        type: DataTypes.STRING,
        require: false
    },
    next_renovation: {
        type: DataTypes.DATE,
        allowNull: false,
        require: true
    },
    portion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
    },
    details: {
        type: DataTypes.STRING,
        require: false
    },
    franchise_value: {
        type: DataTypes.DECIMAL(10,2),
        require: false
    },
 })
Safe.belongsTo(Cars)
Cars.hasMany(Safe)

module.exports = Safe