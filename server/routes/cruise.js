const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Cruise = require('../models/Cruise')

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// @route GET api/cruises
// @desc Get cruises
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var cruises = []
        const cruises = await Cruise.find({})
        res.json({ success: true, cruises });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/cruises
// @desc Create a cruise
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, rating, typeClass, cabins, description, notes, sortOrder } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Name is require!' });

    try {
        const newCruise = new Cruise({
            name,
            slug: convertToSlug(name),
            rating,
            typeClass,
            cabins,
            description: description || '',
            notes: notes || '',
            sortOrder: sortOrder || 0
        })

        await newCruise.save()
        res.json({ success: true, message: 'Happy learning!', cruise: newCruise });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

});

// @route PUT api/cruises
// @desc Update Cruise
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, rating, typeClass, cabins, description, notes, sortOrder } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Name is require!' });

    try {
        let updateCruise = {
            name,
            slug: convertToSlug(name),
            rating,
            typeClass,
            cabins,
            description: description || '',
            notes: notes || '',
            sortOrder: sortOrder || 0
        }

        const cruiseUpdateCondition = { _id: req.params.id }
        updateCruise = await Cruise.findByIdAndUpdate(cruiseUpdateCondition, updateCruise, { new: true })

        // User not authorised to update post or post not found
        if (!updateCruise)
            return res.status(401).json({ success: false, message: 'Cruise not found or user not authrised' });

        res.json({ success: true, message: 'Excellent progress!', cruise: updateCruise });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route DELETE api/cruises
// @desc Find a cruise
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const cruiseCondition = { _id: req.params.id }
        const cruise = await Cruise.findById(cruiseCondition)
        res.json({ success: true, cruise });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/cruises
// @desc DELETE cruise
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const cruiseDeleteCondition = { _id: req.params.id }
        const deleteCruise = await Cruise.findByIdAndDelete(cruiseDeleteCondition)

        // User not authorised to update cruise or cruise not found
        if (!deleteCruise)
            return res.status(401).json({ success: false, message: 'Cruise not found or user not authorized!!!' });

        res.json({ success: true, message: 'Excellent progress!', cruise: deleteCruise });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router