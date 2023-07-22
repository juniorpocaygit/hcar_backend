const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const Cars = require('./Cars')

const Reviews = db.define('Reviews', {
    review: {
        type: DataTypes.STRING,
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
    details: {
        type: DataTypes.STRING,
        require: false
    },
    next_review: {
        type: DataTypes.STRING,
        require: false
    },
    km_next_review: {
        type: DataTypes.DECIMAL(6,3),
        require: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
})
Reviews.belongsTo(Cars)
Cars.hasMany(Reviews)

module.exports = Reviews