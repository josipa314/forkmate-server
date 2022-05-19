const router = require("express").Router();
// const mongoose = require('mongoose');

const Meal = require('../models/Meal.model');
const Company = require('../models/Company.model');
const User = require ('../models/User.model')



//  Create a new meal
 router.post('/meals', (req, res, next) => {
    const { info } = req.body;

    const newmeal = { 
        info
    }

    Meal.create(newProject) //send a query to the DB 
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating a new project", err);
            res.status(500).json({
                message: "error creating a new project",
                error: err
            });
        })
});



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




module.exports = router;