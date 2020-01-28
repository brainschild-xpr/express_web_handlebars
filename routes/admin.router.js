const express = require("express");
const session = require('express-session');
const router = express.Router();

const { check, validationResult } = require('express-validator');


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
            res.redirect('/user/user-page');
        } else {
            req.session.success = true;
            res.redirect('/user');
        }
    });

router.get('/', function (req, res) {
    res.render('admin_home', {
        adminheader: 'Admin Home',
    });
});

router.get('/register', function (req, res) {
    res.render('admin_register', {
        adminheader: 'Admin Register',
        // message: "Enter Details to Register"
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

module.exports = router;