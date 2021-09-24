const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Depot = require('../models/Depot')
const Supplier = require('../models/Supplier')


// @route GET api/depots
// @desc Get depots
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var depots = []
        const depots = await Depot.find().populate("warehouse", ['name'])
        res.json({ success: true, depots });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/depots
// @desc Create a depot
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { title, receiver, dateAdded, warehouse, total } = req.body
    const { suppliers } = req.body

    //console.log('suppliers', suppliers.length)

    // Simple validation
    if (!title)
        return res.status(400)
            .json({ success: false, message: 'Tên phiếu nhập kho là bắt buộc!' });

    if (!receiver)
        return res.status(400)
            .json({ success: false, message: 'Tên người nhập kho là bắt buộc!' });

    try {
        const newDepot = new Depot({
            title,
            receiver,
            dateAdded: dateAdded || '',
            warehouse: warehouse || '',
            total: total || 0,
            user: req.userId
        })

        const result = await newDepot.save()
            //console.log('result', result)
        if (result) {
            suppliers.map(async(supplier) => {

                const { quantity, price, totalPrice, material, unit } = supplier
                try {
                    const newSupplier = new Supplier({
                        quantity: quantity || 0,
                        price: price || 0,
                        totalPrice: totalPrice || 0,
                        material: material,
                        unit: unit,
                        status: 'import',
                        depot: result._id
                    })
                    await newSupplier.save()
                } catch (error) {
                    console.log(error)
                    res.status(500).json({ success: false, message: 'Lỗi nhập vật liệu!!!' });
                }
            })
            res.json({ success: true, message: 'Nhập kho thành công!!!', depot: result });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi nhập kho!!!' });
    }

});

// @route PUT api/depots
// @desc Update Depot
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { title, receiver, dateAdded, warehouse, total } = req.body
    const { suppliers } = req.body

    // Simple validation
    if (!title)
        return res.status(400)
            .json({ success: false, message: 'Tên phiếu nhập kho là bắt buộc!' });

    if (!receiver)
        return res.status(400)
            .json({ success: false, message: 'Tên người nhập kho là bắt buộc!' });


    try {
        let updateDepot = {
            title,
            receiver,
            dateAdded: dateAdded || '',
            warehouse: warehouse || '',
            total: total || 0,
            user: req.userId
        }

        const depotUpdateCondition = { _id: req.params.id }
        updateDepot = await Depot.findByIdAndUpdate(depotUpdateCondition, updateDepot, { new: true })

        // User not authorised to update depot or depot not found
        if (!updateDepot) {
            return res.status(401).json({ success: false, message: 'Không tìm thấy hoặc bạn không có quyền cập nhật!!!' });
        } else {
            suppliers.map(async(supplier) => {

                const { quantity, price, totalPrice, material, unit } = supplier

                if (supplier._id) {
                    try {
                        let updateSupplier = {
                            quantity: quantity || 0,
                            price: price || 0,
                            totalPrice: totalPrice || 0,
                            material: material,
                            unit: unit,
                            status: 'import',
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
                            price: price || 0,
                            totalPrice: totalPrice || 0,
                            material: material,
                            unit: unit,
                            status: 'import',
                            depot: req.params.id
                        })
                        await newSupplier.save()
                    } catch (error) {
                        console.log(error)
                        res.status(500).json({ success: false, message: 'Lỗi nhập vật liệu!!!' });
                    }
                }
            })

            res.json({ success: true, message: 'Cập nhật phiếu nhập kho thành công!!!', depot: updateDepot });
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/depots
// @desc Find a depot
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const depotCondition = { _id: req.params.id }
        const depot = await Depot.findById(depotCondition)
        res.json({ success: true, depot });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/depots
// @desc DELETE depot
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const depotDeleteCondition = { _id: req.params.id }
        const deleteDepot = await Depot.findByIdAndDelete(depotDeleteCondition)

        // User not authorised to update depot or depot not found
        if (!deleteDepot)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa!!!' });

        res.json({ success: true, message: 'Xóa thành công!', depot: deleteDepot });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router