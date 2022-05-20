const Meal = require("../models/Meal.model");
module.exports = (req, res, next) => {
    // checks if the creator of the meal is logged in when trying to access a specific page
    const id = req.params.mealId;
    Meal.findById(id)
    .populate("user")
    .then( (mealFromDB) => {
    
        if (mealFromDB.user._id == req.payload._id) {
            next();
        }
        else {
            res.status(401).json({message: "user unauthorized"})
        }
    }
  )
};