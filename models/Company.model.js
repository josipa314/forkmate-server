const { Schema, model } = require("mongoose");

const companySchema = new Schema({
    name: {type: String, enum: ["Netflix", "Microsoft", "TooGoodToGo"]},
    city: String,
    
});

const Company = model("Company", companySchema);

module.exports = Company;