const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Warehouse = require('../models/Warehouse')


// @route GET api/warehouses
// @desc Get warehouses
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var categories = []
        const warehouses = await Warehouse.find({})
        res.json({ success: true, warehouses });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/warehouses
// @desc Create a warehouse
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, phone, address, description } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên kho là bắt buộc!' });

    try {
        const newWarehouse = new Warehouse({
            name,
            phone: phone || '',
            address: address || '',
            description: description || ''
        })

        await newWarehouse.save()
        res.json({ success: true, message: 'Thêm kho thành công!!!', warehouse: newWarehouse });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi tạo mới kho!!!' });
    }

});

// @route PUT api/warehouses
// @desc Update warehouse
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, phone, address, description } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên kho là bắt buộc!' });

    try {
        let updateWarehouse = {
            name,
            phone: phone || '',
            address: address || '',
            description: description || ''
        }

        const warehouseUpdateCondition = { _id: req.params.id }
        updateWarehouse = await Warehouse.findByIdAndUpdate(warehouseUpdateCondition, updateWarehouse, { new: true })

        // User not authorised to update post or post not found
        if (!updateWarehouse)
            return res.status(401).json({ success: false, message: 'Không tìm thấy kho hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật kho thành công!!!', warehouse: updateWarehouse });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/warehouses
// @desc Find a warehouse
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const warehouseCondition = { _id: req.params.id }
        const warehouse = await Warehouse.findById(warehouseCondition)
        res.json({ success: true, warehouse });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/warehouses
// @desc DELETE warehouse
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const warehouseCondition = { _id: req.params.id }
        const deleteWarehouse = await Warehouse.findByIdAndDelete(warehouseCondition)

        // User not authorised to update category or category not found
        if (!deleteWarehouse)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa kho!!!' });

        res.json({ success: true, message: 'Xóa kho thành công!', warehouse: deleteWarehouse });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router