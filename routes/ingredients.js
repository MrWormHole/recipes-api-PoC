const express = require("express")

const validator = require('validator').default
const { Ingredient } = require("../models/ingredient")

const router = express.Router()

// Get all ingredients
router.get("/", (req, res) => {
    Ingredient.findAll()
        .then((ingredients) => {
            res.status(200).json(ingredients)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

//Get an ingredient
router.get("/:id", (req, res) => {
    let id = req.params.id

    Ingredient.findByPk(id)
        .then((ingredient) => {
            res.status(200).json(ingredient)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

//Post an ingredient
router.post("/", (req, res) => {
    let data = req.body
    let { name, recipeId } = data
    let errors = []


    if (name === undefined || validator.isEmpty(name)) {
        errors.push({"Message": "name can not be blank!"})
    }
    if (recipeId === undefined|| validator.isEmpty(recipeId.toString()) || !validator.isNumeric(recipeId.toString())) {
        errors.push({"Message": "recipeId can not be blank and has to be a number!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Ingredient.create(data)
        .then((ingredient) => {
            res.status(200).json(ingredient)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

//Delete an ingredient
router.delete("/:id", (req, res) => {
    let id = req.params.id

    Ingredient.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Ingredient with id ${id} has been destroyed successfully`})
    }).catch(err => {
        console.log(err)
        res.status(400)
    })
})

//Put an ingredient
router.put("/:id", (req, res) => {
    let id = req.params.id
    let data = req.body
    let { name } = data
    let errors = []


    if (name === undefined || validator.isEmpty(name)) {
        errors.push({"Message": "name can not be blank!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Ingredient.update(data, {
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Ingredient with id ${id} has been updated successfully`})
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

module.exports = router;