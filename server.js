const express = require('express')
const path = require('path')
const exp_hbrs = require('express-handlebars')

const app = express()
const PORT = 3000
const main_layout = path.join(__dirname, 'views/main_layout')

app.engine('handlebars', exp_hbrs({
    defaultLayout: 'main',
    layoutsDir: main_layout
}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    // res.status(200).json({ message: 'Welcome to Home' })
    res.render('index', {
        title: 'HomePage',
        isTrue: true,
        connectedUser: true
    })
})

app.get('/about', function (req, res) {
    // res.status(200).json({ message: 'Welcome to Home' })
    res.render('about', {
        title: 'AboutPage',
        name: 'BCXPR',
        author: 'Shungoh'
    })
})

app.get('/team', function (req, res) {
    res.render('team', {
        programmers: [
            'Martin',
            'Ian',
            'Luffy',
            'Steve'
        ],
        accountant: {
            name: 'Malory Archer',
            username: 'ilovemoney',
            office_number: 'b40',
            phone: '0785746334'
        },

    })
})

app.get('/food', function (req, res) {
    res.render('food', {
        food: [
            { fruits: ['passion', 'orange', 'apple'] },
            { vegetables: ['spinach', 'cauliflower', 'kales'] },
            { junk: ['pizza', 'burger', 'sandwitch'] },
            { beverages: ['coffee','tea','choco'] }
        ]
    })
})

app.listen(PORT, function () {
    console.log('Server listening at port:', PORT)
})