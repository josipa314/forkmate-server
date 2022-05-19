const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
   /*  type: { type: String, enum: ["lunch", "snack", "dinner"]},
    title: String, */
    description : String,
     /* whereWhen: String, */
     /* company: {
      type: Schema.Types.ObjectId,
       ref: "Company" }, */
 
    /* user: {
      type: Schema.Types.ObjectId,
       ref: "User" },
       timestamps: true 
     } */

});

const Meal = model("Meal", mealSchema);

module.exports = Meal;
