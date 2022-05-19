const { Schema, model } = require("mongoose");

const companySchema = new Schema({
    name: String,
    address: String,
    
});

const Company = model("Company", companySchema);

module.exports = Company;