const express = require("express")
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const validator = require('validator').default
const { Recipe } = require("../models/recipe")
const { Ingredient } = require("../models/ingredient")
const { Rating } = require("../models/rating")
const { Nutrition } = require("../models/nutrition")

const router = express.Router()

// Get all recipes(Eager loading is not needed here)
router.get("/", (req, res) => {
    Recipe.findAll()
        .then((recipes) => {
            res.status(200).json(recipes)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

router.get('/search', (req, res) => {
    let { term } = req.query;
    term = term.toLowerCase();

    let errors = []
    if (validator.isEmpty(term) || !validator.isAlpha(term)) {
        errors.push({"Message": "term can not be blank and has to be a string!"})
    }
    if (errors.length > 0) {
        res.sendStatus(400).json(errors)
    }
  
    Recipe.findAll({ 
        where: { 
            [Op.or] : [
                { title: { [Op.like]: '%' + term + '%' } },
                { description: { [Op.like]: '%' + term + '%'} }
            ]
        } 
    }).then((recipes) => {
        res.status(200).json(recipes)
      })
      .catch(err => {
          console.log(err)
          res.sendStatus(400)
      })
})

//Get a recipe(Eager loading is needed here)
router.get("/:id", (req, res) => {
    let id = req.params.id

    Recipe.findByPk(id, {
        include: [
          Ingredient,
          Rating,
          Nutrition
        ]
      })
        .then((recipe) => {
            res.status(200).json(recipe)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

//Post a recipe
router.post("/", (req, res) => {
    let data = req.body
    let { title, description, author, isVegan,  isVegetarian, 
        servings, preparationTime, cookingTime, cookingDifficulty, budget,
        method, thumbnailImageURL} = data
    let errors = []


    if (title === undefined || validator.isEmpty(title)) {
        errors.push({"Message": "title can not be blank!"})
    }
    if (description === undefined || validator.isEmpty(description)) {
        errors.push({"Message": "description can not be blank!"})
    }
    if (author === undefined || validator.isEmpty(author)) {
        errors.push({"Message": "author can not be blank!"})
    }
    if (isVegan === undefined || !validator.isBoolean(isVegan.toString())) {
        errors.push({"Message": "isVegan can not be blank and has to be a boolean!"})
    }
    if (isVegetarian === undefined || !validator.isBoolean(isVegetarian.toString())) {
        errors.push({"Message": "isVegetarian can not be blank and has to be a boolean!"})
    }
    if (servings === undefined || !validator.isNumeric(servings.toString())) {
        errors.push({"Message": "servings can not be blank and has to be a number!"})
    }
    if (preparationTime === undefined || !validator.isNumeric(preparationTime.toString())) {
        errors.push({"Message": "preparationTime can not be blank and has to be a number!"})
    }
    if (cookingTime === undefined || !validator.isNumeric(cookingTime.toString())) {
        errors.push({"Message": "cookingTime can not be blank and has to be a number!"})
    }
    if (cookingDifficulty === undefined || !validator.isAlpha(cookingDifficulty)) {
        errors.push({"Message": "cookingDifficulty can not be blank!"})
    }
    if (budget === undefined) {
        errors.push({"Message": "budget can not be blank!"})
    }
    if (method === undefined) {
        errors.push({"Message": "method can not be blank!"})
    }
    if (thumbnailImageURL === undefined || !validator.isURL(thumbnailImageURL)) {
        errors.push({"Message": "method can not be blank!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Recipe.create(data)
        .then((recipe) => {
            res.status(200).json(recipe)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

router.delete("/:id", (req, res) => {
    let id = req.params.id

    Recipe.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Recipe with id ${id} has been destroyed successfully`})
    }).catch(err => {
        console.log(err)
        res.status(400)
    })
})

router.put("/:id", (req, res) => {
    let id = req.params.id
    let data = req.body
    let { title, description, author, isVegan,  isVegetarian, 
        servings, preparationTime, cookingTime, cookingDifficulty, budget,
        method, thumbnailImageURL} = data
    let errors = []


    if (title === undefined || validator.isEmpty(title)) {
        errors.push({"Message": "title can not be blank!"})
    }
    if (description === undefined || validator.isEmpty(description)) {
        errors.push({"Message": "description can not be blank!"})
    }
    if (author === undefined || validator.isEmpty(author)) {
        errors.push({"Message": "author can not be blank!"})
    }
    if (isVegan === undefined || !validator.isBoolean(isVegan.toString())) {
        errors.push({"Message": "isVegan can not be blank and has to be a boolean!"})
    }
    if (isVegetarian === undefined || !validator.isBoolean(isVegetarian.toString())) {
        errors.push({"Message": "isVegetarian can not be blank and has to be a boolean!"})
    }
    if (servings === undefined || !validator.isNumeric(servings.toString())) {
        errors.push({"Message": "servings can not be blank and has to be a number!"})
    }
    if (preparationTime === undefined || !validator.isNumeric(preparationTime.toString())) {
        errors.push({"Message": "preparationTime can not be blank and has to be a number!"})
    }
    if (cookingTime === undefined || !validator.isNumeric(cookingTime.toString())) {
        errors.push({"Message": "cookingTime can not be blank and has to be a number!"})
    }
    if (cookingDifficulty === undefined || !validator.isAlpha(cookingDifficulty)) {
        errors.push({"Message": "cookingDifficulty can not be blank!"})
    }
    if (budget === undefined) {
        errors.push({"Message": "budget can not be blank!"})
    }
    if (method === undefined) {
        errors.push({"Message": "method can not be blank!"})
    }
    if (thumbnailImageURL === undefined || !validator.isURL(thumbnailImageURL)) {
        errors.push({"Message": "method can not be blank!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Recipe.update(data, {
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Recipe with id ${id} has been updated successfully`})
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

module.exports = router;