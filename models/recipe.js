const { DataTypes } = require('sequelize')
const { db } = require("../db/database")

const Recipe = db.define('recipe', {
    title: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },
    author: {
        type: DataTypes.STRING(100)
    },
    isVegan: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isVegetarian: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    servings: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    preparationTime: {
        type: DataTypes.INTEGER
    },
    cookingTime: {
        type: DataTypes.INTEGER
    },
    cookingDifficulty: {
        type: DataTypes.ENUM,
        values: ["easy", "medium", "hard"],
        defaultValue: "easy"
    },
    budget: {
        type: DataTypes.STRING(20),
        defaultValue: "unknown"
    },
    method: {
        type: DataTypes.TEXT
    }
    // this model can make use of imageURL
    // nutrition will be relational 1-1
    // ingredient will be relational 1 to many
    // rating will be here relatonal 1 to many
}) 

Recipe.sync({ force: true }).then(() => {
    console.log('recipe table migrated')
})

module.exports = { Recipe }