const { DataTypes } = require('sequelize')
const { db } = require("../db/database")

const Ingredient = db.define('ingredient', {
    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
})

Ingredient.sync({ force: true }).then(() => {
    console.log('recipe table migrated')
})

module.exports = { Ingredient }