const express = require("express")

const { Ingredient } = require("../models/ingredient")

const router = express.Router()

router.get("/", (req, res) => {
    Ingredient.findAll()
        .then((ingredients) => {
            res.sendStatus(200).json(ingredients)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

module.exports = router;