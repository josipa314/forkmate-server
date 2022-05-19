const { Schema, model } = require("mongoose");

const companySchema = new Schema({
    name: String,
    city: String,
    
});

const Company = model("Company", companySchema);

module.exports = Company;