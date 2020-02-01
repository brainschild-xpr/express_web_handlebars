const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Enter Username')
            }
        }
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Enter FirstName')
            }
        }
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Enter LastName')
            }
        }
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Enter Password')
            } else if (validator.equals(value.toLowerCase(), "password")) {
                throw new Error('Password is invalid')
            } else if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error("Password invalid, contains 'password' ")
            }
        }
    },
    userCreatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    token: {
        type: String,
    }
})

module.exports = mongoose.model('User', userSchema)