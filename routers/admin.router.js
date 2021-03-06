const path = require('path')
const express = require("express")
const bcrypt = require('bcryptjs')
const session = require('express-session')

const router = express.Router()

const { check, validationResult } = require('express-validator')

const valid = require('../validators/validation')
User = require('../models/user.model')

router.get('/home', async function (req, res) {
    try {
        const users = await User.find({})
        const data =
            users.map(function (value) {
                const user_id = value._id
                const user_name = value.username
                const user_firstname = value.firstname
                const user_lastname = value.lastname
                const user_email = value.email
                const user_password = value.password
                const user_createDate = value.userCreatedDate

                formatedData =
                {
                    userId: user_id,
                    username: user_name,
                    firstname: user_firstname,
                    lastname: user_lastname,
                    email: user_email,
                    password: user_password,
                    date: user_createDate
                }
                return formatedData
            })
        console.log(data)
        res.render('admin_home', {
            adminheader: 'Admin Home',
            users: data,
            // response: responseData
        })
    } catch (error) {

    }

})

router.get('/register', function (req, res) {
    res.render('admin_register', {
        adminheader: 'Admin Register',
        success: req.session.success,
        errors: req.session.errors
    })
    req.session.errors = null
})

router.get('/login', function (req, res) {
    res.render('admin_login', {
        adminheader: 'Admin Login',
    })
})

router.get('/dashboard', function (req, res) {
    res.render('admin_dash', {
        adminheader: 'Admin Dashboard',
    })
})

router.get('/blockchain', function (req, res) {
    res.render('blockchain', {
        adminheader: 'Admin BlockChain',
    })
})



router.get('/generate', function (req, res) {
    res.render('admin_generate', {
        adminheader: 'Admin Generate',
        success: req.session.success,
        errors: req.session.errors
    })
    req.session.errors = null
})
let isPost = false
router.get('/create_post', function (req, res) {
    isPost = true
    res.render('admin_home', {
        adminheader: 'Admin Create Post',
        isPost: isPost,
        success: req.session.success,
        errors: req.session.errors

    })
    req.session.errors = null
})


router.post('/login_post', valid.loginCheck, (req, res) => {
    console.log()
    console.log(req.body.username)
    console.log(req.body.password)
    console.log()
    var errors = validationResult(req).formatWith(valid.errorFormatter)
    // var errors = validationResult(req)

    if (!errors.isEmpty()) {
        // res.status(400).json(errors.array())
        console.log(errors.array())

        res.render('admin_login', {
            adminheader: 'Admin Login',
            errors: errors.array(),
            username: req.body.username,
            password: req.body.password,
        })
    } else {
        res.render('admin_home', {
            adminheader: "Admin Home",
            user: req.body.username
        })
    }
})

router.post('/register_post', valid.registerCheck, (req, res) => {
    console.log()
    console.log('Email', req.body.email)
    console.log('Username', req.body.username)
    console.log('Password', req.body.password)
    console.log('Confirm Password', req.body.confirm_password)
    console.log()

    var errors = validationResult(req).formatWith(valid.errorFormatter)
    // var errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors.array())
        res.render('admin_register', {
            adminheader: 'Admin Register',
            errors: errors.array(),
            username: req.body.username,
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
    } else {

        bcrypt.hash(req.body.password, 10, (error, hash) => {
            if (error) {
                // return res.status(500).json({ ErrorMessage: error })
            }
            else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: hash
                })
                user.save()
                    .then(result => {
                        console.log('Result:', result)
                        res.render('admin_login', {
                            adminheader: "Admin Login",
                            username: req.body.username
                        })
                    })
                    .catch(error => {
                        console.log('Error', error)
                        res.render('admin_error', {
                            adminheader: 'Error404',
                            message: error.message
                        })
                    }
                    )
            }
        })
    }
})



module.exports = router



















// router.post('/create-user',
//     [
//         check('fname')
//             .not()
//             .isEmpty()
//             .withMessage('First Name is required'),

//         check('sname')
//             .not()
//             .isEmpty()
//             .withMessage('Second Name is required'),

//         check('email', 'Email is required')
//             .isEmail(),

//         check('password', 'Password is requried')
//             .isLength({ min: 1 })
//             .custom((val, { req, loc, path }) => {
//                 if (val !== req.body.confirm_password) {
//                     throw new Error("Passwords don't match")
//                 } else {
//                     console.log(val)
//                     return val
//                 }
//             }),
//     ], (req, res) => {
//         var errors = validationResult(req).array()
//         if (errors) {
//             req.session.errors = errors
//             req.session.success = false
//             res.redirect('/admin/register')
//         } else {
//             req.session.success = true
//             res.redirect('/user/register')
//         }
//     })





// router.post('/generate', async (req, res) => {

//     var errors = validationResult(req).array()
//     if (errors) {
//         console.log(errors)

//         req.session.errors = errors
//         req.session.success = false
//         res.redirect('/admin/generate')
//     } else {

//         bcrypt.hash(req.body.password, 10, (error, hash) => {
//             if (error) {
//                 return res.status(500).json({ ErrorMessage: error })
//             }
//             else {
//                 const user = new User({
//                     email: req.body.email,
//                     password: hash
//                 })
//                 user.save()
//                     .then(result => {
//                         console.log('Result:', result)
//                         res.render('admin_dash', {
//                             adminheader: 'Admin Dashboard',
//                             message: 'User Created Succesfully',
//                         })

//                         // res.status(200).json({
//                         //     message: 'User Created Succesfully',
//                         //     // result: result
//                         // })
//                     })
//                     .catch(error => {
//                         console.log('Error', error)
//                         res.render('admin_error', {
//                             adminheader: 'Error404',
//                             message: error.message
//                         })
//                         // res.status(500).json({
//                         //     message: 'Error Creating User',
//                         //     error: error
//                         // })
//                     }
//                     )
//             }
//         })
//         req.session.success = true
//         res.redirect('/admin/dashboard')
//     }
// })


// router.post('/create_post', valid.registerCheck, (req, res) => {
//     // console.log(req.body)
//     var errors = validationResult(req).formatWith(valid.errorFormatter)
//     // var errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         // res.status(400).json(errors.array())
//         console.log(errors.array())

//         res.render('admin_home', {
//             errors: errors.array()
//         })
//     } else {
//         // res.sendStatus(200)
//         res.render('admin_home', {
//             adminheader: "Admin Home",
//             user: req.body.username
//         })
//     }
// })