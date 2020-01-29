const express = require('express')

const router = express.Router()

Photos = require('../models/onepiece.model')

router.get('/', async function (req, res) {
    try {
        const photos = await Photos.find()
        console.log(photos)
        // res.status(200).json(photos)
        res.render('op_home', {
            style: 'onepiece_index',
            title: 'OnePiece Home',
            heading: 'OnePiece Home',
            smth: photos
        })
    }
    catch (error) {
        res.render('error', { message: error.message })
        console.log(error.message);

    }
})

router.get('/:id', getPhoto, (req, res) => {
    console.log('\nRunning from GET/:id');

    console.log({
        'Fetched with ID': res.photo._id,
        'JSON DOC Fetched': res.photo
    });
    // res.json(res.photo)
    res.render('op_getall',
        {
            id: res.photo.id,
            title: res.photo.title,
            url: res.photo.url
            // 'Date of Subscription': res.subscriber.subscribeDate

        })
})


// Function for GetSubscribers
async function getPhoto(req, res, next) {
    let photo
    try {
        photo = await Photos.findById(req.params.id)
        if (photo == null) {
            console.log('DOC ID was available but is inexistent at the the moment');

            return res.status(404).json({ message: 'Cannot find photo' })
        }
        console.log('getPhoto Ran');
    } catch (error) {
        console.log('Error with ID Passed: Maybe incorrect', req.params.id)
        return res.status(500).json({ message: error.message })
    }
    res.photo = photo
    // console.log('Let', subscriber);
    // console.log('Res', res.subscriber);

    next()

}

module.exports = router