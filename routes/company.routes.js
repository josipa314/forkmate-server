const router = require("express").Router();
const mongoose = require('mongoose');

const Meal = require('../models/Meal.model');
const Company = require('../models/Company.model');
const User = require ('../models/User.model')

const { populate } = require("../models/Meal.model");

// CREATE company
router.post('/company', (req, res, next) => {
    const { name, city } = req.body;

    const newCompany = {
        name, 
        city
    }

    Company.create(newCompany)  
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating a new company", err);
            res.status(500).json({
                message: "error creating a new company",
                error: err
            });
        })
});


//GET enum values
router.get('/company/enumcompanyvalues', async (req, res, next) => { 
    const companyTypes=Company.schema.path("name").enumValues
      await res.json(companyTypes)
  })
  


// List ALL companies
router.get("/companies", (req, res, next) => {
    Company.find()
        .then( response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of companies", err);
            res.status(500).json({
                message: "error getting list of companies",
                error: err
            });
        })
});

//  GET DETAILS of a specific company
router.get('/companies/:companyId', (req, res, next) => {
    
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Company.findById(companyId)
        
        .then(meal => res.json(meal))
        .catch(err => {
            console.log("error getting details of a company", err);
            res.status(500).json({
                message: "error getting details of a company",
                error: err
            });
        })
});


// UPDATE by id
router.put('/companies/:companyId', (req, res, next) => {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }


    Company.findByIdAndUpdate(companyId, req.body, { new: true })
        .then((updatedCompany) => res.json(updatedCompany))
        .catch(err => {
            console.log("error updating company", err);
            res.status(500).json({
                message: "error updating company",
                error: err
            });
        })
});


// DELETE by id
router.delete('/companies/:companyId', (req, res, next) => {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Company.findByIdAndRemove(companyId)
        .then(deteletedProject => {
            
        })
        .then(() => res.json({ message: `Project with id ${companyId} is removed successfully.` }))
        .catch(err => {
            console.log("error deleting company", err);
            res.status(500).json({
                message: "error deleting company",
                error: err
            });
        })
});


























module.exports = router;