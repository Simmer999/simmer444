require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const THREE = require('three')

const db = require('./config/config')
db()

app.set('view engine', 'ejs')
app.set('views', (path.join(__dirname, 'views')))

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
//methodOverride
app.use(express.static(__dirname + '/'));
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

require('./api/config/passport')(passport)

const booksRoutes = require('./api/routes/books');
const essayRoutes = require('./api/routes/essayCols');
const poemsRoutes = require('./api/routes/poems');
app.use('/', booksRoutes);
app.use('/', essayRoutes);
app.use('/', poemsRoutes);

app.use('/', require('./api/routes/index'))
app.use('/users', require('./api/routes/users'))

app.get("/noteTaker", (req, res) =>{
    res.render("members/getPages/noteTaker")
})
