/*
    file name: Assignment 2
    student name: Joshua Soriano
    student id: 301 154 852
    date: Friday, October 18, 2021
*/

//exports our renders to index.js inside the roots directory

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the User Model instance
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home'});
};

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About Me' });
};

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', { title: 'Projects' });
};

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', { title: 'Services' });
};

module.exports.displayContactsPage = (req, res, next) => {
    res.render('contact', { title: 'Contacts' });
};

module.exports.displayLoginPage = (req, res, next) => {
    //check if user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else{
        return res.redirect('/business-list');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server err
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error?
            if(err)
            {
                return next(err)
            }
            return res.redirect('/business-list')
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //check if user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/business-list');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: inserting new user");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User already exists!'
                );
                console.log('Error: User already exists')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //if no error exists, then register is successful
            //redirect user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/business-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}