const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Export = require('../models/Export')
const Supplier = require('../models/Supplier')


// @route GET api/exports
// @desc Get exports
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var exports = []
        const exports = await Export.find().populate("warehouse", ['name']).populate("construction", ['name'])
        res.json({ success: true, exports });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/exports
// @desc Create a export
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { title, exporter, receiver, dateExport, warehouse, construction } = req.body
    const { suppliers } = req.body

    //console.log('suppliers', suppliers.length)

    // Simple validation
    if (!title)
        return res.status(400)
            .json({ success: false, message: 'Tên phiếu xuất kho là bắt buộc!' });

    if (!exporter)
        return res.status(400)
            .json({ success: false, message: 'Tên người xuất kho là bắt buộc!' })

    if (!receiver)
        return res.status(400)
            .json({ success: false, message: 'Tên người nhận xuất kho là bắt buộc!' });

    try {
        const newExport = new Export({
            title,
            exporter,
            receiver,
            dateExport: dateExport,
            warehouse: warehouse || '',
            construction: construction || '',
            user: req.userId
        })

        const result = await newExport.save()

        if (result) {
            suppliers.map(async(supplier) => {
                const { quantity, material, unit } = supplier
                try {
                    const newSupplier = new Supplier({
                        quantity: quantity || 0,
                        //price: price || 0,
                        //totalPrice: totalPrice || 0,
                        material: material,
                        unit: unit,
                        status: 'export',
                        depot: result._id
                    })
                    await newSupplier.save()
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ success: false, message: 'Lỗi nhập vật liệu!!!' });
                }
            })
            res.json({ success: true, message: 'Thêm mới phiếu xuất kho thành công!!!', export: result });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi thêm mới phiếu xuất kho!!!' });
    }

});

// @route PUT api/exports
// @desc Update export
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { title, exporter, receiver, dateExport, warehouse, construction } = req.body
    const { suppliers } = req.body

    // Simple validation
    if (!title)
        return res.status(400)
            .json({ success: false, message: 'Tên phiếu xuất kho là bắt buộc!' });

    if (!exporter)
        return res.status(400)
            .json({ success: false, message: 'Tên người xuất kho là bắt buộc!' })

    if (!receiver)
        return res.status(400)
            .json({ success: false, message: 'Tên người nhận xuất kho là bắt buộc!' });


    try {
        let updateExport = {
            title,
            exporter,
            receiver,
            dateExport: dateExport || '',
            warehouse: warehouse || '',
            construction: construction || '',
            user: req.userId
        }

        const exportUpdateCondition = { _id: req.params.id }
        updateExport = await Export.findByIdAndUpdate(exportUpdateCondition, updateExport, { new: true })

        // User not authorised to update Export or Export not found
        if (!updateExport) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy hoặc bạn không có quyền cập nhật!!!' });
        } else {
            suppliers.map(async(supplier) => {
                const { quantity, material, unit } = supplier

                if (supplier._id) {
                    try {
                        let updateSupplier = {
                            quantity: quantity || 0,
                            material: material,
                            unit: unit,
                            status: 'export',
                            depot: req.params.id
                        }
                        const supplierUpdateCondition = { _id: supplier._id }
                        await Supplier.findByIdAndUpdate(supplierUpdateCondition, updateSupplier, { new: true })
                    } catch (error) {
                        console.log(error)
                        res.status(500).json({ success: false, message: 'Lỗi nhập vật liệu!!!' });
                    }
                } else {
                    try {
                        const newSupplier = new Supplier({
                            quantity: quantity || 0,
                            material: material,
                            unit: unit,
                            status: 'export',
                            depot: req.params.id
                        })
                        await newSupplier.save()
                    } catch (error) {
                        console.log(error)
                        res.status(500).json({ success: false, message: 'Lỗi nhập vật liệu!!!' });
                    }
                }
            })
            res.json({ success: true, message: 'Cập nhật nhập kho thành công!!!', export: updateExport });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/exports
// @desc Find a export
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const exportCondition = { _id: req.params.id }
        const findExport = await Export.findById(exportCondition)
        res.json({ success: true, findExport });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/exports
// @desc DELETE export
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const exportDeleteCondition = { _id: req.params.id }
        const deleteExport = await Export.findByIdAndDelete(exportDeleteCondition)

        // User not authorised to update export or export not found
        if (!deleteExport)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa!!!' });

        res.json({ success: true, message: 'Xóa thành công!', export: deleteExport });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router