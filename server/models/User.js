const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    level: {
        type: String,
        enum: ['manager', 'accountant', 'stocker', 'staff'] // giám đốc, kế toán, thủ kho, nhân viên
    },
    status: {
        type: String,
        enum: ['active', 'unActive']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('users', UserSchema)