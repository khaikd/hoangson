const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require: true
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

module.exports = mongoose.model('cars', CarSchema)