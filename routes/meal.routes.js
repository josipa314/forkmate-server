const router = require("express").Router();
const mongoose = require('mongoose');

const Meal = require('../models/Meal.model');
const Company = require('../models/Company.model');
const User = require ('../models/User.model')



//  Create a new meal
 router.post('/meals', (req, res, next) => {
    const {info} = req.body;

    const newMeal = { 
        info
    }

    Meal.create(newMeal) //send a query to the DB 
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating a new meal", err);
            res.status(500).json({
                message: "error creating a new meal",
                error: err
            });
        })
});


// Get list of meals
 router.get("/meals", (req, res, next) => {
    Meal.find()
         /* .populate("user") */ 
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

//  Get details of a specific meal by id
router.get('/meals/:mealId', (req, res, next) => {
    
    const { mealId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

   Meal.findById(mealId)
       /*  .populate('user') */
        .then(project => res.json(project))
        .catch(err => {
            console.log("error getting details of a meal", err);
            res.status(500).json({
                message: "error getting details of a meal",
                error: err
            });
        })
});

// Updates a specific meal by id
router.put('/meals/:mealId', (req, res, next) => {
    const { mealId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    // const newDetails = {
    //     info: req.body.info,
    //    
    // }

   Meal.findByIdAndUpdate(mealId, req.body, { new: true })
        .then((updatedMeal) => res.json(updatedMeal))
        .catch(err => {
            console.log("error updating meal", err);
            res.status(500).json({
                message: "error updating meal",
                error: err
            });
        })
});

// Delete a specific meal by id
router.delete('/meals/:mealId', (req, res, next) => {
    const { mealId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }
    

    // Project.findByIdAndRemove(projectId)
    //     .then(() => res.json({ message: `Project with ${projectId} is removed successfully.` }))
    Meal.findByIdAndRemove(mealId)
       /*  .then(deteletedMeal => {
            return User.deleteMany({ _id: { $in: deteletedMeal.user } });
        }) */
        .then(() => res.json({ message: `Project with id ${mealId} & all associated users were removed successfully.` }))
        .catch(err => {
            console.log("error deleting project", err);
            res.status(500).json({
                message: "error deleting project",
                error: err
            });
        })
});






module.exports = router;