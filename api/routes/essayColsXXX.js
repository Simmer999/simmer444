const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const mongoose = require('mongoose')
// .set('debug', true)
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB #3.')
})

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Essay = require('../models/essays');

const Essays = db.collection('Essays')  //These are the names of the collections in the database.


//==================================================================== GETs 
router.get('/essays', (req, res) => {
    res.render('newPages/newEssay')
})

router.get('/newEssay', (req, res) => { 
    Essays.find().toArray()
    .then(results =>{
        res.render('newPages/newEssay', { entries : results})
    })
    .catch(error => console.error(error))
})
//==================================================================== GETs
//==================================================== Code for EssayList
router.get('/EssayList', (req, res) => { 
    Essays.find().toArray()
        .then(results =>{
            res.render('getPages/EssayList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================== Code for EssayList
//==================================================== Code for essayPresentaion
router.get('/essayPresentation', (req, res) => {
    db.collection('Essays')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        console.log(results)
        res.render('members/getPages/essayPresentation', { Essays: results })  
    })
    .catch(error => console.error(error))
})
//==================================================== Code for essayPresentaion
//==================================================== Code for essayDetails
router.get('/Essays/:id', (req, res) => {
    const id = req.params.id 
    console.log(id)
    // db.collection('Books').find( { } ).toArray()
    Essay.findById(id)
    .then(result => {   
    res.render('members/details/essayDetails', { Essay: result }) 
    // console.log(result)
    })
    .catch(err => {
    console.log(err)   
})
})
//==================================================== Code for essayDetails


//========================================================== POST for newEssay
router.post('/newEssay', (req, res) => {
    const essay = new Essay(req.body)
    essay.save()
    .then((result) => {
        res.render('corePages/directory')
    })
    .catch(err => {
        console.log(err)   
    })
})
//========================================================== POST for newEssay


module.exports = router;
