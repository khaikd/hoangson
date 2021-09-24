const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../models/Post')

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, posts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { title, slug, description, url, status } = req.body

    // Simple validation
    if (!title)
        return res.status(400)
            .json({ success: false, message: 'Title is require!' });

    try {
        const newPost = new Post({
            title,
            slug: convertToSlug(title),
            description: description || '',
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()
        res.json({ success: true, message: 'Happy learning!', post: newPost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { title, slug, description, url, status } = req.body

    // Simple validation
    if (!title)
        return res.status(400)
            .json({ success: false, message: 'Title is require!' });

    try {
        let updatePost = {
            title,
            slug: convertToSlug(title),
            description: description || '',
            url: ((url.startsWith('https://')) ? url : `https://${url}`) || '',
            status: status || 'TO LEARN',
            user: req.userId
        }

        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatePost = await Post.findByIdAndUpdate(postUpdateCondition, updatePost, { new: true })

        // User not authorised to update post or post not found
        if (!updatePost)
            return res.status(401).json({ success: false, message: 'Post not found or user not authrised' });

        res.json({ success: true, message: 'Excellent progress!', post: updatePost });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

})

// @route DELETE api/posts
// @desc DELETE post
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const deletePost = await Post.findByIdAndDelete(postDeleteCondition)

        // User not authorised to update post or post not found
        if (!deletePost)
            return res.status(401).json({ success: false, message: 'Post not found or user not authrised' });

        res.json({ success: true, message: 'Excellent progress!', post: deletePost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})



module.exports = router