const dotenv = require('dotenv');
const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash')
const session = require('express-session')
const bodyparser = require("body-parser");
const passport = require('passport')
const THREE = require('three')





//-----------------------------------------------
app.use(flash())
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(passport.initialize())
app.use(passport.session())
require('./api/config/passport')(passport);




//-----------------------------------------------




const connectDB = require('./server/database/connection');

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 5553

connectDB();
// log requests
app.use(morgan('tiny'));

//-----------------------------------------------

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
app.set('views', (path.join(__dirname, 'views')))

// app.use(express.static(path .join(__dirname, '/public')))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/src', express.static(path.resolve(__dirname, "assets/src")))

// load routers
app.use('/', require('./server/routes/router'))
// app.use('/', require('./server/routes/users'))
// app.use('/', require('./server/routes/books'))
// app.use('/', require('./api/routes/index'))
// app.use('/users', require('./api/routes/users'))
// app.use('/', require('./api/routes/indexRoutes/mianLogicRoute'))

// port listening and confirmation
app.listen(PORT, ()=> { 
    console.log(`Server is running on http://localhost:${PORT}`)});