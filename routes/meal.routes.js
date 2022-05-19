const router = require("express").Router();
// const mongoose = require('mongoose');

const Meal = require('../models/Meal.model');
const Company = require('../models/Company.model');

// Get list of meals
router.get("/meals", (req, res, next) => {
    Project.find()
/*         .populate("user") */
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of meals", err);
            res.status(500).json({
                message: "error getting list of meals",
                error: err
            });
        })
});


//  Create a new meal
/* router.post('/meals', (req, res, next) => {
    const { title, description, companyId } = req.body;

    const newmeal = { 
        location, 
        description,
    }

    Meal.create(newmeal)
        .then(mealFromDB => {
            return Company.findByIdAndUpdate(companyId, { $push: { meals: mealFromDB._id } } );
        })
        .then( response => {
            res.status(201).json(response)
        })
        .catch(err => res.json(err));
}); */

module.exports = router;