const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Cars = require('./Cars')

const Maintenance = db.define('Maintenance', {
    maintenance: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    assistance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        require: true
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
    next_maintenance: {
        type: DataTypes.DECIMAL(6,3),
        require: false
    },
    next_maintenance: {
        type: DataTypes.DECIMAL(6,3),
        require: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    details: {
        type: DataTypes.STRING,
        require: false,
    },
    

})
Maintenance.belongsTo(Cars)
Cars.hasMany(Maintenance)

module.exports = Maintenance