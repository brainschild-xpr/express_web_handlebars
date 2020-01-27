const mongoose = require('mongoose')

const photosSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    url_2: {
        type: String,
        required: false,
    },
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Photos', photosSchema)