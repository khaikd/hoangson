const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Supplier = require('../models/Supplier')


// @route GET api/suppliers
// @desc Get suppliers
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var suppliers = []
        const suppliers = await Supplier.find({})
        res.json({ success: true, suppliers });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route GET api/suppliers
// @desc Get suppliers
// @access Private
router.get('/:id', verifyToken, async(req, res) => {
    try {
        const suppliers = await Supplier.find({ depot: req.params.id }).populate("material", ['name']).populate("unit", ['name'])
        res.json({ success: true, suppliers });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/suppliers
// @desc Create a supplier
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { quantity, price, totalPrice, status, unit, material } = req.body

    try {
        const newSupplier = new Supplier({
            quantity: quantity || 0,
            price: price || 0,
            totalPrice: totalPrice || 0,
            status: status || '',
            unit: unit,
            material: material
        })

        await newSupplier.save()
        res.json({ success: true, message: 'Thêm vật tư xây dựng thành công!!!', supplier: newSupplier });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi thêm vật tư xây dựng!!!' });
    }

});

// @route PUT api/suppliers
// @desc Update supplier
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { quantity, price, totalPrice, status, unit, material } = req.body

    try {
        let updateSupplier = {
            quantity: quantity || 0,
            price: price || 0,
            totalPrice: totalPrice || 0,
            status: status || '',
            unit: unit,
            material: material
        }

        const supplierUpdateCondition = { _id: req.params.id }
        updateSupplier = await Supplier.findByIdAndUpdate(supplierUpdateCondition, updateSupplier, { new: true })

        // User not authorised to update post or post not found
        if (!updateSupplier)
            return res.status(401).json({ success: false, message: 'Không tìm thấy vật tư hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật vật tư xây dựng thành công!!!', supplier: updateSupplier });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/suppliers
// @desc Find a supplier
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const supplierCondition = { _id: req.params.id }
        const supplier = await Supplier.findById(supplierCondition)
        res.json({ success: true, supplier });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/suppliers
// @desc DELETE supplier
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const supplierDeleteCondition = { _id: req.params.id }
        const deleteSupplier = await Supplier.findByIdAndDelete(supplierDeleteCondition)

        // User not authorised to update Supplier or Supplier not found
        if (!deleteSupplier)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa danh mục!!!' });

        res.json({ success: true, message: 'Xóa vật tư xây dựng thành công!', supplier: deleteSupplier });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router