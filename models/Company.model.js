const { Schema, model } = require("mongoose");

const companySchema = new Schema({
    name: {type: String, enum: ["Netflix", "Microsoft", "TooGoodToGo","IronHack"]},
    city: String,
    
});

const Company = model("Company", companySchema);

module.exports = Company;