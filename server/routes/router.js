// This file contains four sections.
// The first is for the incoming modules, routes, and the API.
// The second is for the GET routes of the memoryApp section.
// The third is for the POST routes of the memoryApp section.
// The fouth is for the GET routes of the simmer999 section.
// The fifth is for the modification routes of the memoryApp.


// 1========= Incoming modules, routes, and the API.
//Modules
const express = require('express');
const route = express.Router()
const {ensureAuthenticated} = require('../../api/config/auth') 
const User = require("../model/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

// Routes
const services = require('../services/render');
const controller = require('../controller/controller');

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
// ===================================================

// 2======== MemoryApp GET route section
route.get('/', services.homeRoutes);

route.get('/bookList', services.indexRoutes);

route.get('/cube', (req, res) => {
    res.render('cube')
})
route.get('/welcome', (req, res) => {
    res.render('memoryApp/welcome')
})

route.get('/login', (req, res) => {
    res.render('memoryApp/login')
})

route.get('/dashboard', (req, res) => {
    res.render('memoryApp/dashboard')
})
route.get('/dashboard',ensureAuthenticated,(req, res) => {
    res.render('memoryApp/dashboard',{
        user: req.user
    });
})

route.get('/directory', (req, res) => {
    res.render('memoryApp/directory')
})

route.get('/register',(req,res)=>{
    res.render('register')
})
// ==================================================

// 3======== MemoryApp POST route section
route.post('/login',(req, res, next)=>{
    passport.authenticate('local',{
        successRedirect : '/dashboard',  //++++++++!!!!!!!!!!!
        failureRedirect: '/login',
        failureFlash : true
    })(req, res, next)
})

route.post('/register', (req, res) => {
    const {name,email, password, password2} = req.body;
    console.log(req.body)
    let errors = [];
    console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
        if(!name || !email || !password || !password2) {
            errors.push({msg : "Please fill in all fields"})
        }
        //check if match
        if(password !== password2) {
            errors.push({msg : "passwords don't match"});
        }
    
        //check if password is more than 6 characters
        if(password.length < 6 ) {
            errors.push({msg : 'password at least 6 characters'})
        }
        if(errors.length > 0 ) {
        res.render('register', {
            errors : errors,
            name : name,
            email : email,
            password : password,
            password2 : password2})
            } else { //======validation passed
            User.findOne({email : email}).exec((err,user)=>{
            console.log(user + ' 58');   
            if(user) {
                errors.push({msg: 'email already registered'});
                res.render('register',{errors,name,email,password,password2})  
                } else {
                const newUser = new User({
                    name : name,
                    email : email,
                    password : password
                });
                console.log(new User + ' 68')
                //hash password
                bcrypt.genSalt(10,(err, salt)=> 
                bcrypt.hash(newUser.password, salt,
                    (err, hash)=> {
                        if(err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                        //save user
                        newUser.save()
                        .then((value)=>{
                            console.log(value + ' 79')
                            req.flash('success_msg','You have now registered!');
                            res.redirect('/users/login');
                        })
                        .catch(value=> console.log(value));    
                    }));
                }
           })
        }
    })
// ============================================

// 4=========== simmer999 routes
route.get('/home', (req, res) => {
    res.render('simmer999/home')
})
route.get('/skybox', (req, res) => {
    res.render('simmer999/skybox')
})
route.get('/4_skyboxes', (req, res) => {
    res.render('simmer999/4_skyboxes')
})
route.get('/ocean', (req, res) => {
    res.render('simmer999/ocean')
})
route.get('/star_lines', (req, res) => {
    res.render('simmer999/star_lines')
})
route.get('/sphere', (req, res) => {
    res.render('simmer999/sphere')
})
route.get('/space', (req, res) => {
    res.render('simmer999/space')
})
// =================================================

// 5======= MemoryApp Modification routes
route.get('/add-user', services.add_user)

route.get('/update-user', services.update_user)

route.get('/book_update', services.update_user)
// ===================================================

module.exports = route