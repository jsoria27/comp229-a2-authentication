//view all login info in the database
//this is the info route

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Info Model
let Info = require('../models/info');

/* GET Route for the User Info page - READ Operation */
router.get('/', (req, res, next) => {
    Info.find((err, InfoList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(InfoList)
            res.render('info', {title: 'Info List', InfoList: InfoList})
        }
    });
});

//export our routes into one single package
module.exports = router;