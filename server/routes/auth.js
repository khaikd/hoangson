const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../models/User')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found!' });
        }

        res.json({ success: true, user })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
});

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/users', verifyToken, async(req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json({ success: true, users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
});

// @route POST api/auth
// @desc Create a auth
// @access Private
router.post('/', verifyToken, async(req, res) => {
    const { name, username, password, phone, address, description, level, status } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Họ và tên là bắt buộc!' });

    if (!username || !password) return res.status(400).json({ success: false, message: 'Tài khoản và mật khẩu không được bỏ trống!' });

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({ success: false, message: 'Tên tài khoản này đã được sử dụng bạn hãy chọn tên khác!' });

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            phone: phone || '',
            address: address || '',
            description: description || '',
            level: level || 'staff',
            status: status || 'active'
        })

        await newUser.save()

        // Return token
        //const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'Tạo mới tài khoản thành công!', user: newUser });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }

});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async(req, res) => {
    const { name, username, password } = req.body

    // Simple validation
    if (!username || !password) return res.status(400).json({ success: false, message: 'Missing username and/or password' });
    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({ success: false, message: 'Username already taken' });

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            status: 'unActive'
        })

        await newUser.save()

        // Return token
        //const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: 'User created successfully!' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', async(req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400)
            .json({
                success: false,
                message: 'Missing username and/or password'
            });

    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400)
                .json({
                    success: false,
                    message: 'Incorrect username or password'
                });
        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400)
                .json({
                    success: false,
                    message: 'Incorrect username or password'
                });

        if (user.status !== 'unActive') {
            // All good
            const accessToken = jwt.sign({ userId: user._id },
                process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' }
            )
            res.json({
                success: true,
                message: 'User Login in successfully!',
                accessToken
            });
        } else {
            return res.status(400)
                .json({
                    success: false,
                    message: 'Your account has not been activated!'
                });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

// @route PUT api/auth/:id
// @desc Update auth
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { name, password, phone, address, description, level, status } = req.body

    // Simple validation
    if (!name)
        return res.status(400)
            .json({ success: false, message: 'Họ và tên là bắt buộc!' });

    if (password) {
        try {
            const hashedPassword = await argon2.hash(password)
            let updateUser = {
                name,
                password: hashedPassword,
                phone: phone || '',
                address: address || '',
                description: description || '',
                level: level || '',
                status: status || ''
            }

            const userUpdateCondition = { _id: req.params.id }
            updateUser = await User.findByIdAndUpdate(userUpdateCondition, updateUser, { new: true })

            // User not authorised to update post or post not found
            if (!updateUser)
                return res.status(401).json({ success: false, message: 'Không tìm thấy người dùng hoặc bạn không có quyền cập nhật!!!' });

            res.json({ success: true, message: 'Cập nhật người dùng thành công!!!', user: updateUser });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error!' });
        }
    } else {
        try {
            //const hashedPassword = await argon2.hash(password)
            let updateUser = {
                name,
                //password: hashedPassword,
                phone: phone || '',
                address: address || '',
                description: description || '',
                level: level || '',
                status: status || ''
            }

            const userUpdateCondition = { _id: req.params.id }
            updateUser = await User.findByIdAndUpdate(userUpdateCondition, updateUser, { new: true })

            // User not authorised to update post or post not found
            if (!updateUser)
                return res.status(401).json({ success: false, message: 'Không tìm thấy người dùng hoặc bạn không có quyền cập nhật!!!' });

            res.json({ success: true, message: 'Cập nhật người dùng thành công!!!', user: updateUser });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error!' });
        }
    }

})

// @route DELETE api/auth
// @desc DELETE auth
// @access Private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const userDeleteCondition = { _id: req.params.id }
        const deleteUser = await User.findByIdAndDelete(userDeleteCondition)

        // User not authorised to update category or category not found
        if (!deleteUser)
            return res.status(401).json({ success: false, message: 'Bạn không có quyền xóa tài khoản!!!' });

        res.json({ success: true, message: 'Xóa tài khoản thành công!', user: deleteUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error!' });
    }
})

module.exports = router