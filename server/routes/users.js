const express = require('express');
const router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcrypt');
const passport = require('passport');

//========================================================= GET requests
//login handle
router.get('/login',(req,res)=>{
    res.render('login');
})
//Register handle
router.get('/register',(req,res)=>{
    res.render('register')
    })
//logout

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.get('/directory', (req, res) => {
    res.render('directory')
})

//========================================================= GET requests


//========================================================= POST requests
//========================================================= Login
router.post('/login',(req, res, next)=>{
passport.authenticate('local',{
    successRedirect : '/dashboard',  //++++++++!!!!!!!!!!!
    failureRedirect: '/login',
    failureFlash : true
})(req, res, next)
})

//========================================================= register
router.post('/register', (req, res) => {
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
//========================================================= POST requests



module.exports  = router;