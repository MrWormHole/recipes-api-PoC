const express = require("express")

const validator = require('validator').default
const { Recipe } = require("../models/recipe")

const router = express.Router()

router.get("/", (req, res) => {
    Recipe.findAll()
        .then((recipes) => {
            res.sendStatus(200).json(recipes)
        })
        .catch(err => { 
            console.log(err)
            res.sendStatus(400)
        })
})

/*router.post("/", (req, res) => {
    
})*/

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
        res.sendStatus(200).json(recipes)
      })
      .catch(err => {
          console.log(err)
          res.sendStatus(400)
      });
  });

module.exports = router;