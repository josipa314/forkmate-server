const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
    type: { type: String, enum: ["lunch", "snack", "dinner"]},
    portions: Number,
    description: String,
    location: String,
    time: Number,
    message: String,
    /* company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company" 
    }, */
    user: {
      type: Schema.Types.ObjectId,
       ref: "User" }
});

const Meal = model("Meal", mealSchema);

module.exports = Meal;
