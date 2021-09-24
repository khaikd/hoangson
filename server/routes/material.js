const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Material = require('../models/Material')

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// @route GET api/materials vật liệu xây dựng
// @desc Get materials
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var materials = []
        const materials = await Material.find({})
        res.json({ success: true, materials });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/materials
// @desc Create a material
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, description, sortOrder, category } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên nhóm là bắt buộc!' });

    try {
        const newMaterial = new Material({
            name,
            slug: convertToSlug(name),
            description: description || '',
            sortOrder: sortOrder || 0,
            category
        })

        await newMaterial.save()
        res.json({ success: true, message: 'Thêm vật liệu xây dựng thành công!!!', material: newMaterial });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi Thêm vật liệu xây dựng!!!' });
    }

});

// @route PUT api/materials
// @desc Update Material
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, description, sortOrder, category } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên nhóm là bắt buộc!' });

    try {
        let updateMaterial = {
            name,
            slug: convertToSlug(name),
            description: description || '',
            sortOrder: sortOrder || 0,
            category
        }

        const materialUpdateCondition = { _id: req.params.id }
        updateMaterial = await Material.findByIdAndUpdate(materialUpdateCondition, updateMaterial, { new: true })

        // User not authorized to update material or material not found
        if (!updateMaterial)
            return res.status(401).json({ success: false, message: 'Không tìm thấy nhóm hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật danh mục vật liệu xây dựng thành công!!!', material: updateMaterial });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route DELETE api/materials
// @desc Find a material
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const materialCondition = { _id: req.params.id }
        const material = await Material.findById(materialCondition)
        res.json({ success: true, material });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/materials
// @desc DELETE material
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const materialDeleteCondition = { _id: req.params.id }
        const deleteMaterial = await Material.findByIdAndDelete(materialDeleteCondition)

        // User not authorized to update material or material not found
        if (!deleteMaterial)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa vật liệu xây dựng!!!' });

        res.json({ success: true, message: 'Xóa danh mục thành công!', material: deleteMaterial });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router