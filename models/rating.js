const { DataTypes } = require('sequelize')
const { db } = require("../db/database")

const Rating = db.define('rating', {
    stars: {
        type: DataTypes.ENUM,
        values: ["0", "1", "2", "3", "4", "5"],
        defaultValue: "0"
    },
    ratedBy: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
})

module.exports = { Rating }