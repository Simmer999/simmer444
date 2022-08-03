const express = require('express')
const router  = express.Router()

// router.get('/', (req, res) => {
//     res.render('index')
// })
router.get('/', (req, res) => {
    res.render('cube')
})
router.get('/members/welcome', (req, res) => {
    res.render('members/welcome')
})
router.get('/members/login', (req, res) => {
    res.render('members/login')
})
//
//Where is the dashboard route?
//
router.get('/members/directory', (req, res) => {
    res.render('members/directory')
})
//register page
router.get('/register', (req, res) => {
    res.render('register')
})



//==========================================================
//==========================================================
//==========================================================
//==========================================================
router.get('/simmer999/home', (req, res) => {
    res.render('simmer999/home')
})
router.get('/simmer999/4_skyboxes', (req, res) => {
    res.render('simmer999/4_skyboxes')
})
router.get('/simmer999/skybox', (req, res) => {
    res.render('simmer999/skybox')
})
router.get('/simmer999/ocean', (req, res) => {
    res.render('simmer999/ocean')
})
router.get('/simmer999/space', (req, res) => {
    res.render('simmer999/space')
})
router.get('/simmer999/sphere', (req, res) => {
    res.render('simmer999/sphere')
})
router.get('/simmer999/stars', (req, res) => {
    res.render('simmer999/stars')
})
router.get('/simmer999/star_Lines', (req, res) => {
    res.render('simmer999/star_Lines')
})

module.exports = router