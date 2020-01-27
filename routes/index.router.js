var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', {
        style: 'index.css',
        title: 'HomePage',
        isTrue: true,
        connectedUser: false,

        duoCurly: '<h3>Welcome to Duo Curly</h3>',
        trioCurly: '<h3>Welcome to Trio Curly</h3>',
        author: {
            firstname: 'Malory',
            lastname: 'Archer',
            employees: {
                first: 'Sterling Archer',
                second: 'Lana Kane',
                third: 'Cyril Figgis'
            }
        },
    })
})

router.get('/about', function (req, res) {
    res.render('about', {
        style: 'about.css',
        title: 'AboutPage',
        name: 'BCXPR',
        author: 'Shungoh'
    })
})

router.get('/team', function (req, res) {
    res.render('team', {
        style: 'team.css',
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
        people: [
            { firstname: 'Janice', secondname: 'Kemunto' },
            { firstname: 'James', secondname: 'Kaimoe' },
            { firstname: 'Archie', secondname: 'Malowa' },
        ]

    })
})

router.get('/food', function (req, res) {
    res.render('food', {
        style: 'food.css',
        food: [
            { fruits: ['passion', 'orange', 'apple'] },
            { vegetables: ['spinach', 'cauliflower', 'kales'] },
            { junk: ['pizza', 'burger', 'sandwitch'] },
            { beverages: ['coffee', 'tea', 'choco'] }
        ]
    })
})

router.get('/admin', function (req, res) {
    res.render('admin', {
        style: 'admin.css'
    })
})

router.get('/docs', function (req, res) {
    res.render('docs', {
        style: 'docs.css'
    })
})

router.get('/dash', function (req, res) {
    res.render('dash', {
        style: 'dash.css'
    })
})

module.exports = router