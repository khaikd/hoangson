const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Unit = require('../models/Unit')


// @route GET api/units
// @desc Get units
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var units = []
        const units = await Unit.find({})
        res.json({ success: true, units });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/units
// @desc Create a unit
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên đơn vị là bắt buộc!' });

    try {
        const newUnit = new Unit({
            name
        })

        await newUnit.save()
        res.json({ success: true, message: 'Thêm đơn vị thành công!!!', unit: newUnit });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi khi thêm đơn vị!!!' });
    }

});

// @route PUT api/units
// @desc Update unit
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên đơn vị là bắt buộc!' });

    try {
        let updateUnit = {
            name
        }

        const unitUpdateCondition = { _id: req.params.id }
        updateUnit = await Unit.findByIdAndUpdate(unitUpdateCondition, updateUnit, { new: true })

        // User not authorised to update post or post not found
        if (!updateUnit)
            return res.status(401).json({ success: false, message: 'Không tìm thấy đơn vị hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật đơn vị thành công!!!', unit: updateUnit });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/units
// @desc Find a unit
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const unitCondition = { _id: req.params.id }
        const unit = await Unit.findById(unitCondition)
        res.json({ success: true, unit });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/units
// @desc DELETE unit
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const unitDeleteCondition = { _id: req.params.id }
        const deleteUnit = await Unit.findByIdAndDelete(unitDeleteCondition)

        // User not authorised to update category or category not found
        if (!deleteUnit)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa đơn vị!!!' });

        res.json({ success: true, message: 'Xóa đơn vị thành công!', unit: deleteUnit });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router