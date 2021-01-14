const express = require("express")

const { Recipe } = require("../models/recipe")

const router = express.Router()


router.get("/", (req, res) => {
    Recipe.findAll()
        .then((recipes) => {
            console.log(recipes)
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
})

router.post("/", (req, res) => {
    
    Recipe.create({
        ...data
    }).then((recipe) => res.redirect("/recipes"))
    .catch(err => console.log(err))
})

module.exports = router;