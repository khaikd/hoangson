const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Category = require('../models/Category')

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// @route GET api/categories
// @desc Get categories
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var categories = []
        const categories = await Category.find({})
        res.json({ success: true, categories });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/cruises
// @desc Create a cruise
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, description } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên nhóm là bắt buộc!' });

    try {
        const newCategory = new Category({
            name,
            slug: convertToSlug(name),
            description: description || ''
        })

        await newCategory.save()
        res.json({ success: true, message: 'Thêm danh mục vật liệu xây dựng thành công!!!', category: newCategory });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi Thêm danh mục vật liệu xây dựng!!!' });
    }

});

// @route PUT api/cruises
// @desc Update Cruise
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, description } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên nhóm là bắt buộc!' });

    try {
        let updateCategory = {
            name,
            slug: convertToSlug(name),
            description: description || ''
        }

        const categoryUpdateCondition = { _id: req.params.id }
        updateCategory = await Category.findByIdAndUpdate(categoryUpdateCondition, updateCategory, { new: true })

        // User not authorised to update post or post not found
        if (!updateCategory)
            return res.status(401).json({ success: false, message: 'Không tìm thấy nhóm hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật danh mục vật liệu xây dựng thành công!!!', category: updateCategory });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route Find api/category
// @desc Find a category
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const categoryCondition = { _id: req.params.id }
        const category = await Category.findById(categoryCondition)
        res.json({ success: true, category });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/category
// @desc DELETE category
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const categoryDeleteCondition = { _id: req.params.id }
        const deleteCategory = await Category.findByIdAndDelete(categoryDeleteCondition)

        // User not authorised to update category or category not found
        if (!deleteCategory)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa danh mục!!!' });

        res.json({ success: true, message: 'Xóa danh mục thành công!', category: deleteCategory });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router