/*
    file name: Assignment 2
    student name: Joshua Soriano
    student id: 301 154 852
    date: Friday, October 18, 2021
*/

let mongoose = require('mongoose');

//create a model class
let businessModel = mongoose.Schema({
    name: String,
    number: String,
    email: String,
},
{
    collection: "business"
});

module.exports = mongoose.model('Business', businessModel);