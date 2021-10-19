/*
    file name: Assignment 2
    student name: Joshua Soriano
    student id: 301 154 852
    date: Friday, October 18, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the models
let Business = require('../models/business');

module.exports.displayBusinessList = (req, res, next) => {
    Business.find((err, businessList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('business/list', {title: 'Business Contacts', BusinessList: businessList});
        }
    });
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business.findById(id, (err, businessToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('business/edit', {title: 'Edit Contact', business: businessToEdit})
        }
    });
};

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id; //changed this

    let updatedBusiness = Business({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    Business.updateOne({_id: id}, updatedBusiness, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(updatedBusiness);
            res.redirect('/business-list');
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/business-list')
        }
    });
};
