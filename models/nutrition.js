const { DataTypes } = require('sequelize')
const { db } = require("../db/database")

const Nutrition = db.define('nutrition', {
    kcal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fat: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    saturates: {
        type: DataTypes.STRING(10)
    },
    carbs: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    sugars: {
        type: DataTypes.STRING(10),
        defaultValue: false
    },
    fibre: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    protein: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}) 

Nutrition.sync({ force: true }).then(() => {
    console.log('nutrition table migrated')
})

module.exports = { Nutrition }