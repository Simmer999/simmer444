const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const axios = require('axios');

const mongoose = require('mongoose')
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB #Books.')
})

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// var User = require('../models/user');
const Book = require('../model/books');

const Books = db.collection('Books')    //These are the names of the collections in the database.

//========================
router.get('/Books/:id', (req, res) => { //Same as 
    const id = req.params.id;
    // console.log('Arrrgh!');
    Book.findById(id)
    .then(result => {
        res.render('members/updatePages/book_update', { Books: result});
        // console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
})
//===========================

router.post('/book_update', (req, res) => {
     console.log(req.body)
    Book.findByIdAndUpdate(req.params.id)
   
    // Book.save()
    .then((result) => {
        res.render('members/directory')
    })
    .catch(err => {
        console.log(err)   
    })
})

//==============================


//==================================================================== GETs 
router.get('/books', (req, res) => {
    res.render('newPages/newBook')
})

router.get('/newBook', (req, res) => {
    Books.find().toArray()
    .then(results =>{
        res.render('newPages/newBook', { entries : results})
    })
    .catch(error => console.error(error))
})
//==================================================================== GETs

//==================================================== Code for bookDetails
router.get('/Bookss/:id', (req, res) => { //Same as 
    const id = req.params.id 
    console.log(id)
    // db.collection('Books').find( { } ).toArray()
    Book.findById(id)
    .then(result => {  
    res.render('members/details/bookDetails', { Book: result }) 
    // console.log(result)
    })
    .catch(err => {
    console.log(err)   
})
})
//==================================================== Code for bookDetails
//==================================================== Code for book_update
//==================================================== Turn on and off.

//==================================================== Code for book_update


//==================================================== Code for BookList
router.get('/BookList', (req, res) => { 
    Books.find().toArray()
        .then(results => {
            res.render('getPages/BookList', { entries : results})
        })
        .catch(error => console.error(error))
    })
//==================================================== Code for BookList
//==================================================== Code for bookPresentaion
router.get('/bookPresentation', (req, res) => {
    db.collection('Books')
    .find()
    .toArray()
    .then(results => {
        //In order to print the contents of the database to the console:
        // console.log(results)
        res.render('members/getPages/bookPresentation', { Books: results })  
    })
    .catch(error => console.error(error))
})
//==================================================== Code for bookPresentaion

//==================================================== POST for newBook
router.post('/newbook', (req, res) => {
    const book = new Book(req.body)
    book.save()
    .then((result) => {
        res.render('corePages/directory')
    })
    .catch(err => {
        console.log(err)   
    })
})


//==================================================== POST for newBook


router.delete('/Books/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id).then(book => {
        if (!book) {
            return res.status(404).send();
        }
        res.send(book);
    }).catch(error => {
        res.status(500).send(error);
    })
})

module.exports = router;
