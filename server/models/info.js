/*
    file name: Assignment 2
    student name: Joshua Soriano
    student id: 301 154 852
    date: Friday, October 18, 2021
*/
let mongoose = require('mongoose');

//create a model class
let infoModel = mongoose.Schema({
    username: String,
    password: String,
    email: String,
},
{
    collection: "info"
});

/*
module.exports = mongoose.model('Login', infoModel);
*/