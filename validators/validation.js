const { check, validationResult } = require('express-validator')

module.exports = {
    loginCheck: [
        [
            check('username')
                .isLength({ min: 1 }).withMessage('Required Username')
                .isAlphanumeric().withMessage('Login must be alphanumeric'),
            check('password')
                .isLength({ min: 8 }).withMessage('Password must be at least 8 characters in length.')
                .matches('[0-9]').withMessage('Password must contain at least 1 number.')
                .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
                .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
                .custom((value, { req, loc, path }) => {
                    if (value !== req.body.confirm_password) {
                        console.log("\nPasswords Don't Match:", value);
                        return false
                    } else {
                        console.log('\nPasswords Match:', value);
                        // return value
                        return true
                    }
                }).withMessage("Password Don't Match"),
        ]
    ],
    registerCheck: [
        [
            check('email')
            .isEmail(),
            check('username')
                .isLength({ min: 1 }).withMessage('Required Username'),
                // .isAlphanumeric().withMessage('Login must be alphanumeric'),
            check('password')
                .isLength({ min: 8 }).withMessage('Password must be at least 8 characters in length.')
                .matches('[0-9]').withMessage('Password must contain at least 1 number.')
                .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
                .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
                .custom((value, { req, loc, path }) => {
                    if (value !== req.body.confirm_password) {
                        console.log("\nPasswords Don't Match:", value);
                        return false
                    } else {
                        console.log('\nPasswords Match:', value);
                        // return value
                        return true
                    }
                }).withMessage("Password Don't Match"),
        ]
    ],
    errorFormatter: ({ location, msg, param, value, nestedErrors }) => {
        return {
            type: "Error",
            name: "Signup Failure",
            location: location,
            message: msg,
            param: param,
            value: value,
            nestedErrors: nestedErrors,
        }
    }
}