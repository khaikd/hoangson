const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Staff = require('../models/Staff')


// @route GET api/staff
// @desc Get staffs
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var staff = []
        const staffs = await Staff.find({})
        res.json({ success: true, staffs });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/staff
// @desc Create a staff
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, phone, wage, address, image, level, description, status } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên nhân viên là bắt buộc!' });

    try {
        const newStaff = new Staff({
            name,
            phone: phone || '',
            wage: wage || '',
            address: address || '',
            image: image || '',
            level: level || '',
            description: description || '',
            status: status || 'unActive'
        })

        await newStaff.save()
        res.json({ success: true, message: 'Thêm nhân viên thành công!!!', staff: newStaff });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Có lỗi khi thêm nhân viên!!!' });
    }

});

// @route PUT api/staff
// @desc Update Staff
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, phone, wage, address, image, level, description, status } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên nhóm là bắt buộc!' });

    try {
        let updateStaff = {
            name,
            phone: phone || '',
            wage: wage || '',
            address: address || '',
            image: image || '',
            level: level || '',
            description: description || '',
            status: status || 'unActive'
        }

        const staffUpdateCondition = { _id: req.params.id }
        updateStaff = await Staff.findByIdAndUpdate(staffUpdateCondition, updateStaff, { new: true })

        // User not authorised to update staff or staff not found
        if (!updateStaff)
            return res.status(401).json({ success: false, message: 'Không tìm thấy nhân viên hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật nhân viên thành công!!!', staff: updateStaff });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/staff
// @desc Find a staff
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const staffCondition = { _id: req.params.id }
        const staff = await Staff.findById(staffCondition)
        res.json({ success: true, staff });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/staff
// @desc DELETE staff
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const staffDeleteCondition = { _id: req.params.id }
        const deleteStaff = await Staff.findByIdAndDelete(staffDeleteCondition)

        // User not authorised to update staff or staff not found
        if (!deleteStaff)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa nhân viên!!!' });

        res.json({ success: true, message: 'Xóa nhân viên thành công!', staff: deleteStaff });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router