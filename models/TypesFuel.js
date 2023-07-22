const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const TypesFuel = db.define('TypesFuel', {
    type_fuel: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
})

module.exports = TypesFuel