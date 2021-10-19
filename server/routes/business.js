/*
    file name: Assignment 2
    student name: Joshua Soriano
    student id: 301 154 852
    date: Friday, October 18, 2021
*/

//view all business info in the database
//this is the business route

const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let businessController = require('../controllers/business');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next(); //go to next call
}

/* GET Route for the Business Contacts page - READ Operation */
router.get('/', requireAuth, businessController.displayBusinessList);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, businessController.displayEditPage);

/* POST Route for processing Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, businessController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, businessController.performDelete);

//export our routes into one single package
module.exports = router;