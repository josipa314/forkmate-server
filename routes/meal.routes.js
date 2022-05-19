const router = require("express").Router();
// const mongoose = require('mongoose');

const Meal = require('../models/meal.model');
const company = require('../models/Company.model');

//  Create a new meal
router.post('/meals', (req, res, next) => {
    const { title, description, companyId } = req.body;

    const newmeal = { 
        title, 
        description, 
        company: companyId 
    }

    Meal.create(newmeal)
        .then(mealFromDB => {
            return Company.findByIdAndUpdate(companyId, { $push: { meals: mealFromDB._id } } );
        })
        .then( response => {
            res.status(201).json(response)
        })
        .catch(err => res.json(err));
});

module.exports = router;