const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Construction = require('../models/Construction')

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// @route GET api/constructions
// @desc Get constructions
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        //var constructions = []
        const constructions = await Construction.find({})
        res.json({ success: true, constructions });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/constructions
// @desc Create a constructions
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, address, description, publicDate, finishDate, status } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên công trình là bắt buộc!' });

    try {
        const newConstruction = new Construction({
            name,
            slug: convertToSlug(name),
            address: address || '',
            description: description || '',
            publicDate: publicDate || '',
            finishDate: finishDate || '',
            status: status || ''
        })

        await newConstruction.save()
        res.json({ success: true, message: 'Thêm công trình thành công!!!', construction: newConstruction });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi khi thêm công trình!!!' });
    }

});

// @route PUT api/constructions
// @desc Update Constructions
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, address, description, publicDate, finishDate, status } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Tên công trình là bắt buộc!' });

    try {
        let updateConstruction = {
            name,
            slug: convertToSlug(name),
            address: address || '',
            description: description || '',
            publicDate: publicDate || '',
            finishDate: finishDate || '',
            status: status || ''
        }

        const constructionUpdateCondition = { _id: req.params.id }
        updateConstruction = await Construction.findByIdAndUpdate(constructionUpdateCondition, updateConstruction, { new: true })

        // User not authorised to update post or post not found
        if (!updateConstruction)
            return res.status(401).json({ success: false, message: 'Không tìm thấy công trình hoặc bạn không có quyền cập nhật!!!' });

        res.json({ success: true, message: 'Cập nhật công trình thành công!!!', construction: updateConstruction });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route DELETE api/constructions
// @desc Find a constructions
// @access Private

router.get('/:id', verifyToken, async(req, res) => {
    try {
        const constructionCondition = { _id: req.params.id }
        const construction = await Construction.findById(constructionCondition)
        res.json({ success: true, construction });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route DELETE api/construction
// @desc DELETE construction
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const constructionDeleteCondition = { _id: req.params.id }
        const deleteConstruction = await Construction.findByIdAndDelete(constructionDeleteCondition)

        // User not authorised to update category or category not found
        if (!deleteConstruction)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa công trình!!!' });

        res.json({ success: true, message: 'Xóa công trình thành công!', construction: deleteConstruction });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router