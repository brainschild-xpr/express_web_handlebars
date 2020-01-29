const path = require('path')
const express = require("express");
const bcrypt = require('bcryptjs')
const session = require('express-session');

const router = express.Router();

const { check, validationResult } = require('express-validator');

User = require('../models/user.model')

router.post('/create-user',
    [
        check('fname')
            .not()
            .isEmpty()
            .withMessage('First Name is required'),
        check('sname')
            .not()
            .isEmpty()
            .withMessage('Second Name is required'),
        check('email', 'Email is required')
            .isEmail(),
        // check('password', 'Password is requried')
        //     .isLength({ min: 1 })
        //     .custom((val, { req, loc, path }) => {
        //         if (val !== req.body.confirm_password) {
        //             throw new Error("Passwords don't match");
        //         } else {
        //             console.log(val);

        //             return val;
        //         }
        //     }),
    ], (req, res) => {
        var errors = validationResult(req).array();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/admin/dashboard');
        } else {
            req.session.success = true;
            res.redirect('/user/register');
        }
    });

router.post('/registerUser', [

    check('email', 'Email is required')
        .isEmail(),
    check('password', 'Password is requried')
        .isLength({ min: 1 })
        .custom((val, { req, loc, path }) => {
            if (val !== req.body.confirm_password) {
                throw new Error("Passwords don't match");
            } else {
                console.log(val);

                return val;
            }
        }),
], async (req, res) => {

    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({ ErrorMessage: error })
        }
        else {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(result => {
                    console.log('Result:', result)
                    res.render('admin_dash', {
                        adminheader: 'Admin Dashboard',
                        message: 'User Created Succesfully',
                    })

                    // res.status(200).json({
                    //     message: 'User Created Succesfully',
                    //     // result: result
                    // })
                })
                .catch(error => {
                    console.log('Error', error)
                    res.render('admin_error', {
                        adminheader: 'Error404',
                        message: error.message
                    })
                    // res.status(500).json({
                    //     message: 'Error Creating User',
                    //     error: error
                    // })
                }
                );
        }
    })
})

router.get('/', async function (req, res) {
    try {
        const user = await User.find({})
        console.log('email', user);

        res.render('admin_home', {
            adminheader: 'Admin Home',
            user: user
        });
    } catch (error) {

    }

});

router.get('/register', function (req, res) {
    res.render('admin_register', {
        adminheader: 'Admin Register',
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

router.get('/login', function (req, res) {
    res.render('admin_login', {
        adminheader: 'Admin Login',
    });
});

router.get('/dashboard', function (req, res) {
    res.render('admin_dash', {
        adminheader: 'Admin Dashboard',
    });
});

router.get('/generate', function (req, res) {
    res.render('admin_generate', {
        adminheader: 'Admin Generate',
    });
});

module.exports = router;