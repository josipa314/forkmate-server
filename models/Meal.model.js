const { Schema, model } = require("mongoose");

const foodSchema = new Schema({
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
      type: mongoose.Schema.Types.ObjectId,
       ref: "User" }
});

const Food = model("Food", foodSchema);

module.exports = Food;
