const express = require("express")

const { Nutrition } = require("../models/nutrition")

const router = express.Router()

router.get("/", (req, res) => {
    Nutrition.findAll()
        .then((nutritions) => {
            res.sendStatus(200).json(nutritions)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

module.exports = router;