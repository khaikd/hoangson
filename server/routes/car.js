const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Car = require('../models/Car')

// @route GET api/cars
// @desc Get cars
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const cars = await Car.find({})
        res.json({ success: true, cars });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/cars
// @desc Create a car
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, description } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên xe là bắt buộc!' });

    try {
        const newCar = new Car({
            name,
            description: description || ''
        })

        await newCar.save()
        res.json({ success: true, message: 'Thêm xe thành công!!!', car: newCar });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi thêm xe!!!' });
    }

});

// @route PUT api/cars
// @desc Update car
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, description } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên xe là bắt buộc!' });

    try {
        let updateCar = {
            name,
            description: description || ''
        }

        const carUpdateCondition = { _id: req.params.id }
        updateCar = await Car.findByIdAndUpdate(carUpdateCondition, updateCar, { new: true })

        // User not authorised to update car or car not found
        if (!updateCar)
            return res.status(401).json({ success: false, message: 'Không tìm thấy xe hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật xe thành công!!!', car: updateCar });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/car
// @desc Find a car
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const carCondition = { _id: req.params.id }
        const car = await Car.findById(carCondition)
        res.json({ success: true, car });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/car
// @desc DELETE car
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const carDeleteCondition = { _id: req.params.id }
        const deleteCar = await Car.findByIdAndDelete(carDeleteCondition)

        // User not authorised to update car or car not found
        if (!deleteCar)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa xe!!!' });

        res.json({ success: true, message: 'Xóa xe thành công!', car: deleteCar });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router