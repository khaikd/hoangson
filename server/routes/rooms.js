const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Room = require('../models/Room')

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// @route GET api/rooms
// @desc Get rooms
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const rooms = await Room.find({})
        res.json({ success: true, rooms });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/rooms
// @desc Create a rooms
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, typeBed, maxRoom, maxAdult, extraBed, connecting, locationRoom, description, cruiseId } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Name is require!' });

    try {
        const newRoom = new Room({
            name,
            slug: convertToSlug(name),
            typeBed: typeBed || 'double',
            maxRoom: maxRoom || 2,
            maxAdult: maxAdult || 2,
            extraBed: extraBed || 'no',
            connecting: connecting || 'no',
            locationRoom,
            description: description || '',
            cruiseId
        })

        await newRoom.save()
        res.json({ success: true, message: 'Create a Room Successfully!', room: newRoom });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

});


// @route PUT api/rooms
// @desc Update Room
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, typeBed, maxRoom, maxAdult, extraBed, connecting, locationRoom, description, cruiseId } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Name is require!' });

    try {
        let updateRoom = {
            name,
            slug: convertToSlug(name),
            typeBed: typeBed || 'double',
            maxRoom: maxRoom || 2,
            maxAdult: maxAdult || 2,
            extraBed: extraBed || 'no',
            connecting: connecting || 'no',
            locationRoom,
            description: description || '',
            cruiseId
        }

        const roomUpdateCondition = { _id: req.params.id }
        updateRoom = await Room.findByIdAndUpdate(roomUpdateCondition, updateRoom, { new: true })

        // User not authorised to update post or post not found
        if (!updateRoom)
            return res.status(401).json({ success: false, message: 'Room not found or user not authorized' });

        res.json({ success: true, message: 'Excellent progress!', room: updateRoom });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route DELETE api/rooms
// @desc DELETE Room
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const roomDeleteCondition = { _id: req.params.id }
        const deleteRoom = await Room.findByIdAndDelete(roomDeleteCondition)

        // User not authorised to update cruise or cruise not found
        if (!deleteRoom)
            return res.status(401).json({ success: false, message: 'Room not found or user not authorized!!!' });

        res.json({ success: true, message: 'Excellent progress!', room: deleteRoom });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

module.exports = router