require('dotenv').config()
const cors = require('cors')
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
app.use(cors());
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

var indexRouter = require('./routes/index.router')
app.use('/', indexRouter)

var onepieceRouter = require('./routes/onepiece.router')
app.use('/onepiece', onepieceRouter)

var adminRouter = require('./routes/admin.router')
app.use('/admin', adminRouter)


const mongoUri = process.env.DB_Uri
const dbPhotos = process.env.DB_photos

const db_photos_url = mongoUri + dbPhotos
const db = mongoose.connection

db.on('error', (err) => {
    console.error('Error Occured:', err)
})

mongoose.connect(db_photos_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.error('Connection Error:', err)
    } else {
        console.log('Database Connected Succesfully. Database Name:', dbPhotos)
    }
})

app.listen(PORT, function () {
    console.log('Server listening at port:', PORT)
})

module.exports = app


// app.get('/', function (req, res) {
//     res.render('index', {
//         style: 'index.css',
//         title: 'HomePage',
//         isTrue: true,
//         connectedUser: false,

//         duoCurly: '<h3>Welcome to Duo Curly</h3>',
//         trioCurly: '<h3>Welcome to Trio Curly</h3>',
//         author: {
//             firstname: 'Malory',
//             lastname: 'Archer',
//             employees: {
//                 first: 'Sterling Archer',
//                 second: 'Lana Kane',
//                 third: 'Cyril Figgis'
//             }
//         },
//     })
// })

// app.get('/about', function (req, res) {
//     // res.status(200).json({ message: 'Welcome to Home' })
//     res.render('about', {
//         style: 'about.css',
//         title: 'AboutPage',
//         name: 'BCXPR',
//         author: 'Shungoh'
//     })
// })

// app.get('/team', function (req, res) {
//     res.render('team', {
//         style: 'team.css',
//         programmers: [
//             'Martin',
//             'Ian',
//             'Luffy',
//             'Steve'
//         ],
//         accountant: {
//             name: 'Malory Archer',
//             username: 'ilovemoney',
//             office_number: 'b40',
//             phone: '0785746334'
//         },
//         people: [
//             { firstname: 'Janice', secondname: 'Kemunto' },
//             { firstname: 'James', secondname: 'Kaimoe' },
//             { firstname: 'Archie', secondname: 'Malowa' },
//         ]

//     })
// })

// app.get('/food', function (req, res) {
//     res.render('food', {
//         style: 'food.css',
//         food: [
//             { fruits: ['passion', 'orange', 'apple'] },
//             { vegetables: ['spinach', 'cauliflower', 'kales'] },
//             { junk: ['pizza', 'burger', 'sandwitch'] },
//             { beverages: ['coffee', 'tea', 'choco'] }
//         ]
//     })
// })

// app.get('/admin', function (req, res) {
//     res.render('admin', {
//         style: 'admin.css'
//     })
// })