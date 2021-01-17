const express = require("express")

const validator = require('validator').default
const { Rating } = require("../models/rating")

const router = express.Router()

// Get all ratings
router.get("/", async (req, res) => {
    await Rating.findAll()
        .then((ratings) => {
            res.status(200).json(ratings)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

//Get a rating
router.get("/:id", (req, res) => {
    let id = req.query.id

    Rating.findByPk(id)
        .then((rating) => {
            res.status(200).json(rating)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

//Post a rating
router.post("/", (req, res) => {
    let data = req.body
    let { ratedBy, stars, recipeId } = data
    let errors = []


    if (!ratedBy || validator.isEmpty(data.ratedBy)) {
        errors.push({"Message": "ratedBy can not be blank!"})
    }
    if (!stars || validator.isEmpty(data.stars) || !["0","1","2","3","4","5"].includes(data.stars)) {
        errors.push({"Message": "stars can not be blank and has to be between 0-5!"})
    }
    if (!recipeId || validator.isEmpty(data.recipeId.toString()) || !validator.isNumeric(data.recipeId.toString())) {
        errors.push({"Message": "recipeId can not be blank and has to be a number!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Rating.create(data)
        .then((rating) => {
            res.status(200).json(rating)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

router.delete("/:id", (req, res) => {
    let id = req.query.id

    Rating.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Rating with id ${id} has been destroyed successfully`})
    }).catch(err => {
        console.log(err)
        res.status(400)
    })
})

router.put("/:id", (req, res) => {
    let id = req.query.id
    let data = req.body
    let { ratedBy, stars } = data

    if (!ratedBy || validator.isEmpty(data.ratedBy)) {
        errors.push({"Message": "ratedBy can not be blank!"})
    }
    if (!stars || validator.isEmpty(data.stars) && !["0","1","2","3","4","5"].includes(data.stars.toString())) {
        errors.push({"Message": "stars can not be blank and has to be between 0-5!"})
    }
    if (errors.length > 0) {
        res.status(400).json(errors)
    }

    Rating.update(data, {
        where: {
            id: id
        }
    }).then(() => {
        res.status(200).json({"Message": `Rating with id ${id} has been updated successfully`})
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

module.exports = router;