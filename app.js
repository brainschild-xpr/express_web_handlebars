require('dotenv').config()
// const cors = require('cors')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const exp_hbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORTADDR || 3000
const main_layout = path.join(__dirname, 'views/main_layout')
const partial_layout = path.join(__dirname, 'views/partials')
const public = path.join(__dirname, 'public')

app.use(bodyParser.json());
app.use(express.static(public))
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(cors());
app.use(cookieParser());
app.use(session({
    secret: 'positronx',
    saveUninitialized: false,
    resave: false
}));

const handle = exp_hbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: main_layout,
    partialsDir: partial_layout,
    // create customer helper
    helpers: {
        calculation: function (value) {
            return value + 50
        },
        list: function (value, options) {
            console.log("Passing Values", value)
            return '<h3>' + options.fn({ test: value, another: 'thing' }) + '</h3>'
        },
        people: function (value, options) {
            //value = people
            let out = "<ul='1'>"
            for (let i = 0; i < value.length; i++) {
                out = out + '<p>' + options.fn(value[i]) + '</p>'
            }
            return out + '</ul>'
        }
    }
})

app.engine('hbs', handle.engine)
app.set('view engine', 'hbs')

var indexRouter = require('./routers/index.router')
app.use('/', indexRouter)

var onepieceRouter = require('./routers/onepiece.router')
app.use('/onepiece', onepieceRouter)

var adminRouter = require('./routers/admin.router')
app.use('/admin', adminRouter)


const mongoUri = process.env.DB_Uri
const dbPhotos = process.env.DB_photos
const dbUsers = process.env.DB_users

const db_photos_url = mongoUri + dbPhotos
const db_users_url = mongoUri + dbUsers
const db = mongoose.connection

db.on('error', (err) => {
    console.error('Error Occured:', err)
})

mongoose.connect(db_photos_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.error('Connection Error:', err)
    } else {
        console.log('Database Connected Succesfully. Database Name:', dbPhotos)
    }
})

mongoose.connect(db_users_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.error('Connection Error:', err)
    } else {
        console.log('Database Connected Succesfully. Database Name:', dbUsers)
    }
})

app.listen(PORT, function () {
    console.log('Server listening at port:', PORT)
})

module.exports = app