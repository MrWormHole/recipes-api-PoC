const { DataTypes } = require('sequelize')
const { db } = require("../db/database")
const { Nutrition } = require("./nutrition")
const { Ingredient } = require("./ingredient")
const { Rating } = require("./rating")

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
    },
    thumbnailImageURL : {
        type: DataTypes.STRING
    }
}) 

Recipe.hasOne(Nutrition, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION"
}) // recipe 1-1 nutrition
Nutrition.belongsTo(Recipe, { foreignKey: 'recipeId' }) //nutrition 1-1 recipe

Recipe.hasMany(Ingredient, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION"
}) // recipe 1-* ingredient
Ingredient.belongsTo(Recipe, { foreignKey: 'recipeId' }) // ingredient *-1 recipe

Recipe.hasMany(Rating, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION"
}) // recipe 1-* rating
Rating.belongsTo(Recipe, { foreignKey: 'recipeId' }) // rating *-1 recipe

/* migrations are hard reset in sequelize

Nutrition.sync({ force: true }).then(() => {
    console.log('nutrition table migrated')
})

Ingredient.sync({ force: true }).then(() => {
    console.log('ingredient table migrated')
})

Rating.sync({ force: true }).then(() => {
    console.log('rating table migrated')
})
*/

module.exports = { Recipe }