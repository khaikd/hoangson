const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StaffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    wage: {
        type: Number
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
        enum: ['fullTime', 'partTime', 'byDate', 'byHour'] // Toàn thời gian, bán thời gian, theo ngày, theo giờ
    },
    status: {
        type: String,
        enum: ['active', 'unActive']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('staff', StaffSchema)