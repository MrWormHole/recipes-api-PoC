const express = require("express")

const validator = require('validator').default
const { Nutrition } = require("../models/nutrition")

const router = express.Router()

// Get all nutritions
router.get("/", (req, res) => {
    Nutrition.findAll()
        .then((nutritions) => {
            res.status(200).json(nutritions)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

//Get a nutrition
router.get("/:id", (req, res) => {
    let id = req.params.id

    Nutrition.findByPk(id)
        .then((nutrition) => {
            res.status(200).json(nutrition)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

//Post a nutrition
router.post("/", async (req, res) => {
    let data = req.body
    let { kcal, fat, saturates, carbs, sugars, fibre, protein, salt, recipeId } = data
    let errors = []


    if (kcal === undefined || validator.isEmpty(kcal.toString())) {
        errors.push({"Message": "kcal can not be blank and has to be an integer!"})
    }
    if (fat == undefined || validator.isEmpty(fat.toString())) {
        errors.push({"Message": "fat can not be blank and has to be a string!"})
    }
    if (saturates == undefined || validator.isEmpty(saturates.toString())) {
        errors.push({"Message": "saturates can not be blank and has to be a string!"})
    }
    if (carbs == undefined || validator.isEmpty(carbs.toString())) {
        errors.push({"Message": "carbs can not be blank and has to be a string!"})
    }
    if (sugars == undefined || validator.isEmpty(sugars.toString())) {
        errors.push({"Message": "sugars can not be blank and has to be a string!"})
    }
    if (fibre == undefined || validator.isEmpty(fibre.toString())) {
        errors.push({"Message": "fibre can not be blank and has to be a string!"})
    }
    if (protein == undefined || validator.isEmpty(protein.toString())) {
        errors.push({"Message": "protein can not be blank and has to be a string!"})
    }
    if (salt === undefined || validator.isEmpty(salt.toString())) {
        errors.push({"Message": "salt can not be blank and has to be a string!"})
    }
    if (recipeId === undefined|| validator.isEmpty(recipeId.toString()) || !validator.isNumeric(recipeId.toString())) {
        errors.push({"Message": "recipeId can not be blank and has to be a number!"})
    }
    
    let existingNutrition = await Nutrition.findOne({
        where: {
            recipeId: recipeId
        }
    })
    if (existingNutrition) {
        errors.push({"Message" : "a recipe has already a nutrition, please update the existing one!"})
    }
    if (errors.length > 0) {
        return res.status(400).json(errors)
    }

    await Nutrition.create(data)
        .then((nutrition) => {
            res.status(200).json(nutrition)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

//Delete a nutrition
router.delete("/:id", (req, res) => {
    let id = req.params.id

    Nutrition.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Nutrition with id ${id} has been destroyed successfully`})
    }).catch(err => {
        console.log(err)
        res.status(400)
    })
})

//Put a nutrition
router.put("/:id", (req, res) => {
    let id = req.params.id
    let { kcal, fat, saturates, carbs, sugars, fibre, protein, salt } = data
    let errors = []


    if (kcal === undefined || validator.isEmpty(kcal.toString()) || !validator.isNumeric(kcal.toString())) {
        errors.push({"Message": "kcal can not be blank and has to be an integer!"})
    }
    if (fat == undefined || validator.isEmpty(fat.toString())) {
        errors.push({"Message": "fat can not be blank and has to be a string!"})
    }
    if (saturates == undefined || validator.isEmpty(saturates.toString())) {
        errors.push({"Message": "saturates can not be blank and has to be a string!"})
    }
    if (carbs == undefined || validator.isEmpty(carbs.toString())) {
        errors.push({"Message": "carbs can not be blank and has to be a string!"})
    }
    if (sugars == undefined || validator.isEmpty(sugars.toString())) {
        errors.push({"Message": "sugars can not be blank and has to be a string!"})
    }
    if (fibre == undefined || validator.isEmpty(fibre.toString())) {
        errors.push({"Message": "fibre can not be blank and has to be a string!"})
    }
    if (protein == undefined || validator.isEmpty(protein.toString())) {
        errors.push({"Message": "protein can not be blank and has to be a string!"})
    }
    if (salt == undefined || validator.isEmpty(salt.toString())) {
        errors.push({"Message": "salt can not be blank and has to be a string!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Nutrition.update(data, {
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Nutrition with id ${id} has been updated successfully`})
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

module.exports = router;