const router = require("express").Router();
const mongoose = require('mongoose');

const Meal = require('../models/Meal.model');
const Company = require('../models/Company.model');
const User = require ('../models/User.model')

const { populate } = require("../models/Meal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const isCreator = require ("../middleware/isCreator.js")


// CRUD works
//  CREATE a new meal
 router.post('/meals', isAuthenticated, (req, res, next) => {
    const {type, description, title, whereWhen} = req.body;

    const newMeal = { 
     type,
     title,
     description, 
     whereWhen,
     company: req.payload.company,
     user: req.payload._id
    }
    //console.log(req.payload);

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

//Get only MY meals
router.get('/mymeals', isAuthenticated, (req, res, next) => {
  
    const { _id } = req.payload
    Meal.find({ user: _id })
      /*   .populate("user") */
        .then(myMeal => res.json(myMeal))
        .catch((err) => next(err));
});

//GET enum values
router.get('/meals/enumvalues', async (req, res, next) => { 
  const mealTypes=Meal.schema.path("type").enumValues
    await res.json(mealTypes)
})


// GET LIST of meals
 router.get("/meals", (req, res, next) => {
    Meal.find()
         .populate("user") 
         .populate("company")
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

//  GET DETAILS of a specific meal by id
router.get('/meals/:mealId', (req, res, next) => {
    
    const { mealId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

   Meal.findById(mealId)
        .populate("user") 
        .populate("company")
        .then(meal => res.json(meal))
        .catch(err => {
            console.log("error getting details of a meal", err);
            res.status(500).json({
                message: "error getting details of a meal",
                error: err
            });
        })
});


// UPDATES a specific meal by id
router.put('/meals/:mealId', isAuthenticated, isCreator, (req, res, next) => {
    const { mealId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

   Meal.findByIdAndUpdate(mealId, req.body, { new: true })
   .populate("user") 
   .populate("company")
        .then((updatedMeal) => res.json(updatedMeal))
        .catch(err => {
            console.log("error updating meal", err);
            res.status(500).json({
                message: "error updating meal",
                error: err
            });
        })
});


// DELETE a specific meal by id
router.delete('/meals/:mealId', isAuthenticated, isCreator, (req, res, next) => {
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